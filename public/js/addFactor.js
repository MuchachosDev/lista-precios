const createFactor = async (e) => {
  e.preventDefault();
  const value = e.target.value.value;
  const supplier = e.target.supplier.value;
  const name = e.target.name.value;
  try {
    const response = await fetch('/api/factors/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value, supplier, name }),
    });
    if (response.ok) {
      alert('Factor creado correctamente');
      window.location.href = '/manage-factors';
    } else {
      alert('Factor no creado');
    }
  } catch (error) {
    alert('Error al crear factor', error);
  }
};
