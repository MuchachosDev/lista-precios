const login = async (e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;

  if (!username || !password) {
    return alert('Por favor, complete todos los campos');
  }

  const loginData = {
    username,
    password,
  };
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Inicio de sesión fallido, por favor intente de nuevo');
  }
};
