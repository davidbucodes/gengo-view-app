export const sites = [
  "Google JP",
  "Google Translate",
  "Google Maps",
  "Google",
  "Jisho.org",
  "Wikitionary",
  "Kanshudo",
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
    case "Google JP":
      return `http://google.co.jp/search?q=${term}`;
    case "Google Maps":
      return `https://www.google.com/maps/search/${term}`;
  }
}
