function formatFilename(text: string) {
  return text.replaceAll(".", "_");
}

type FileExtension = "csv" | "json";

const extensionToType: Record<FileExtension, string> = {
  csv: "text/csv",
  json: "application/json",
};

export function downloadText(
  filename: string,
  text: string,
  fileExtension: FileExtension = "csv"
) {
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + text], {
    type: `${extensionToType[fileExtension]};charset=utf-8`,
  });

  const url = window.URL.createObjectURL(blob);
  const linkElem = document.createElement("a");
  linkElem.href = url;
  linkElem.download = formatFilename(filename);
  linkElem.click();
}
