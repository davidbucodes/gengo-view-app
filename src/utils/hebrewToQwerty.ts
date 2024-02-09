const hebrewToQwertyDictionary: Record<string, string> = {
  ק: "e",
  ר: "r",
  א: "t",
  ט: "y",
  ו: "u",
  ן: "i",
  ם: "o",
  פ: "p",
  ש: "a",
  ד: "s",
  ג: "d",
  כ: "f",
  ע: "g",
  י: "h",
  ח: "j",
  ל: "k",
  ך: "l",
  ף: ";",
  ז: "z",
  ס: "x",
  ב: "c",
  ה: "v",
  נ: "b",
  מ: "n",
  צ: "m",
  ת: ",",
  ץ: ".",
};

export function hebrewToQwerty(text: string) {
  return [...text]
    .map(letter => hebrewToQwertyDictionary[letter] || letter)
    .join("");
}
