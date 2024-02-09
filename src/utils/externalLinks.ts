export const sites = [
  "Google",
  "Google Translate",
  "Jisho.org",
  "Wikitionary",
  "Kanshudo",
  "Google JP",
] as const;

export function getExternalLink(term: string, site: (typeof sites)[number]) {
  switch (site) {
    case "Google":
      return `http://google.com/search?q=${term}`;
    case "Google Translate":
      return `https://translate.google.com/?sl=ja&tl=en&op=translate&text=${term}`;
    case "Jisho.org":
      return `https://jisho.org/search/${term}`;
    case "Wikitionary":
      return `https://en.wiikitionary.org/wiki/${term}#Japanese`; // or %23
    case "Kanshudo":
      return `https://kanshudo.com/search?q=${term}`;
    case "Google":
      return `http://google.co.jp/search?q=${term}`;
  }
}
