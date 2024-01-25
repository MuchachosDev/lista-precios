export const parseTextToNumber = (string) => {
  return string.includes(",")
    ? parseFloat(string.replace(".", "").replace(",", "."))
    : parseFloat(string);
};
