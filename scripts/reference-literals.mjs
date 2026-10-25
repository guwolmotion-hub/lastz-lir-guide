import { parse } from '@babel/parser';

// Read static game-data literals without evaluating downloaded JavaScript.
export function staticLiterals(source) {
  const program = parse(source, { sourceType: 'module' }).program;
  const bindings = new Map();
  for (const statement of program.body) {
    if (statement.type === 'VariableDeclaration') for (const declaration of statement.declarations) if (declaration.id.type === 'Identifier') bindings.set(declaration.id.name, declaration.init);
  }
  const resolved = new Map();
  const resolving = new Set();
  function value(node) {
    if (!node) throw new Error('Not a literal');
    if (['StringLiteral', 'NumericLiteral', 'BooleanLiteral'].includes(node.type)) return node.value;
    if (node.type === 'NullLiteral') return null;
    if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return node.quasis[0].value.cooked;
    if (node.type === 'Identifier') return resolve(node.name);
    if (node.type === 'ArrayExpression') return node.elements.flatMap(item => item?.type === 'SpreadElement' ? value(item.argument) : [item ? value(item) : null]);
    if (node.type === 'ObjectExpression') {
      const pairs = [];
      for (const property of node.properties) {
        if (property.type === 'SpreadElement') pairs.push(...Object.entries(value(property.argument)));
        else if (property.type === 'ObjectProperty') pairs.push([property.computed ? value(property.key) : property.key.name ?? property.key.value, value(property.value)]);
        else throw new Error('Not a static object');
      }
      return Object.fromEntries(pairs);
    }
    if (node.type === 'UnaryExpression' && ['-', '+', '!'].includes(node.operator)) {
      const argument = value(node.argument);
      return node.operator === '-' ? -argument : node.operator === '+' ? +argument : !argument;
    }
    if (node.type === 'BinaryExpression') {
      const left = value(node.left), right = value(node.right);
      const operations = { '+': () => left + right, '-': () => left - right, '*': () => left * right, '/': () => left / right, '**': () => left ** right };
      if (operations[node.operator]) return operations[node.operator]();
    }
    if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && node.callee.object.name === 'JSON' && node.callee.property.name === 'parse') return JSON.parse(value(node.arguments[0]));
    if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && node.callee.object.name === 'Object' && node.callee.property.name === 'freeze') return value(node.arguments[0]);
    if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && node.callee.object.name === 'Object' && node.callee.property.name === 'fromEntries') return Object.fromEntries(value(node.arguments[0]));
    if (node.type === 'MemberExpression') return value(node.object)[node.computed ? value(node.property) : node.property.name];
    if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.arguments.length === 1 && ['String', 'Number'].includes(node.callee.name)) return node.callee.name === 'String' ? String(value(node.arguments[0])) : Number(value(node.arguments[0]));
    throw new Error('Not static data');
  }
  function resolve(name) {
    if (resolved.has(name)) return resolved.get(name);
    if (resolving.has(name) || !bindings.has(name)) throw new Error('Unresolved data reference');
    resolving.add(name);
    try { const result = value(bindings.get(name)); resolved.set(name, result); return result; } finally { resolving.delete(name); }
  }
  const result = {};
  for (const name of bindings.keys()) try { const data = resolve(name); if (data && typeof data === 'object') result[name] = data; } catch { /* Component logic is intentionally excluded. */ }
  return result;
}

export function decodeAstro(value) {
  if (!Array.isArray(value)) return value;
  const [type, data] = value;
  if (type === 1) return data.map(decodeAstro);
  if (type === 0 && data && typeof data === 'object') return Object.fromEntries(Object.entries(data).map(([key, item]) => [key, decodeAstro(item)]));
  if (type === 0) return data;
  throw new Error('Unsupported data encoding: ' + type);
}
