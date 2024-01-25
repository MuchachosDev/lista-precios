const hola = "1.285";

if (hola.includes(",")) {
  const number = parseFloat(hola.replace(".", "").replace(",", "."));
  console.log(number);
} else {
  console.log(parseFloat(hola));
}
