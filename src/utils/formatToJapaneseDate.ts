export function formatToJapaneseDate(date: Date) {
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${year}年${month}月${day}日 ${hours}:${minutes}`;
  return formattedDate;
}
