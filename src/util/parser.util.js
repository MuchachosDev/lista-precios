export const parseTextToNumber = (input) => {
  // Detectar cuál es el separador de mil y cuál es el decimal según el último uso antes de los dígitos finales
  let lastComma = input.lastIndexOf(',');
  let lastDot = input.lastIndexOf('.');

  if (lastComma > lastDot) {
    // Si la última coma está después del último punto, la coma es el separador decimal
    input = input.replace(/\./g, ''); // Eliminar todos los puntos
    input = input.replace(',', '.'); // Cambiar la coma por un punto para hacerlo decimal
  } else {
    // Si el último punto está después de la última coma, el punto es el separador decimal
    input = input.replace(/,/g, ''); // Eliminar todas las comas
  }

  return parseFloat(input);
};

export const parseTextToIva = (iva) => {
  let numero = iva.replace('%', '').trim();

  // Convertir el número a decimal
  let decimal = parseFloat(numero) / 100;

  return decimal;
};
