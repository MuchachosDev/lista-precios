const createSupplier = async (e) => {
  e.preventDefault();
  const name = e.target.supplier.value;
  const dollar = e.target.dollar.value;
  const enableCurrencySelect = e.target.enableCurrencySelect.checked;
  try {
    const response = await fetch('/api/suppliers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ name, dollar, enableCurrencySelect }),
    });
    if (response.ok) {
      alert('Proveedor creado correctamente');
      window.location.href = '/manage-suppliers';
    } else {
      alert('Proveedor no creado');
    }
  } catch (error) {
    alert('Error al crear proveedor', error);
  }
};
