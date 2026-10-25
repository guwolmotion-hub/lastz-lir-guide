export function wildHoggsUrl(path, lang) {
  const url = new URL(path.replace('/{lang}/', '/'), 'https://wild-hoggs.com');
  url.pathname = url.pathname.replace(/^\/(ko|en|es)\//, '/');
  if (lang === 'ko' || lang === 'es') url.pathname = '/' + lang + url.pathname;
  return url.href;
}
