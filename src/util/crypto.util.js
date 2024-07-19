import pkg from 'bcryptjs';
const { hashSync, compareSync, genSaltSync } = pkg;

// Crea un hash de una contraseña
const createHash = (password) => {
  return hashSync(password, genSaltSync(10));
};

// Compara una contraseña con un hash
const compareHash = (password, hash) => {
  return compareSync(password, hash);
};

export { createHash, compareHash };
