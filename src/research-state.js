export function readResearchMap(value) {
  try { const p=JSON.parse(value);return p&&typeof p==='object'&&!Array.isArray(p)?p:{}; } catch { return {}; }
}
export function normalizeLevels(tree, levels={}) {
  return Object.fromEntries(tree.nodes.map(n=>[n.id,Math.max(0,Math.min(n.max,Math.floor(Number(levels[n.id])||0)))]));
}
export function prerequisitePath(tree, levels, id, level) {
  const result=normalizeLevels(tree,levels), visiting=new Set();
  function visit(id,level){const node=tree.nodes.find(n=>n.id===id);if(!node||visiting.has(id))return;visiting.add(id);result[id]=Math.max(result[id],Math.min(node.max,level));if(result[id]>0)for(const req of node.requires)visit(req.id,req.requiredLevel);visiting.delete(id);}
  visit(id,level);return result;
}
export function changeResearchLevel(tree, levels, id, level) {
  const result=normalizeLevels(tree,{...levels,[id]:level});
  // Lowering a prerequisite invalidates descendants, including indirect ones.
  for(let pass=0;pass<tree.nodes.length;pass++){let changed=false;for(const node of tree.nodes)if(result[node.id]>0&&node.requires.some(r=>result[r.id]<r.requiredLevel)){result[node.id]=0;changed=true;}if(!changed)break;}
  return result;
}
export function researchLayout(tree,horizontal=false) {
  const depths={},visiting=new Set();
  function depth(id){if(depths[id]!=null)return depths[id];if(visiting.has(id))throw Error('Cyclic research tree');visiting.add(id);const node=tree.nodes.find(n=>n.id===id);const value=node.requires.length?1+Math.max(...node.requires.map(r=>depth(r.id))):0;visiting.delete(id);return depths[id]=value;}
  tree.nodes.forEach(n=>depth(n.id));const groups=new Map();for(const node of tree.nodes){const d=depths[node.id];if(!groups.has(d))groups.set(d,[]);groups.get(d).push(node);}
  const positions={},width=720,nodeWidth=198,nodeHeight=188,gap=74;let row=0;
  for(const[,nodes]of[...groups].sort(([a],[b])=>a-b)){for(let i=0;i<nodes.length;i+=3){const chunk=nodes.slice(i,i+3),left=(width-(chunk.length*nodeWidth+(chunk.length-1)*28))/2;chunk.forEach((n,j)=>positions[n.id]={x:left+j*(nodeWidth+28),y:24+row*(nodeHeight+gap)});row++;}}
  const height=24+row*(nodeHeight+gap);
  if(horizontal)for(const p of Object.values(positions)){const x=p.x;p.x=p.y;p.y=x;}
  return {positions,width:horizontal?height:width,height:horizontal?width:height,nodeWidth,nodeHeight};
}
