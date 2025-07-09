export const checkPlural = (items: any[]) => (items.length > 1 ? "s" : "");

export const renderSymbols = (words: string) =>
  words.replaceAll("&apos;", "'").replaceAll("&quot;", '"');

export const translateDuration = (durationString: string) => {
  let result = "";
  // assuming duration will be in the correct IMDB format, e.g. PT1H4M8S
  durationString = durationString.slice(2, durationString.length);
  if (durationString.includes("H")) {
    const hours = parseInt(durationString.slice(0, durationString.indexOf("H")));
    result += `${hours} hour${hours > 1 ? "s" : ""} `;
    durationString = durationString.slice(durationString.indexOf("H") + 1, durationString.length);
  }
  if (durationString.includes("M")) {
    const minutes = parseInt(durationString.slice(0, durationString.indexOf("M")));
    result += `${minutes} minute${minutes > 1 ? "s" : ""} `;
    durationString = durationString.slice(durationString.indexOf("M") + 1, durationString.length);
  }
  if (durationString.includes("S")) {
    const seconds = parseInt(durationString.slice(0, durationString.indexOf("S")));
    result += `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
  return result.trimEnd();
};
