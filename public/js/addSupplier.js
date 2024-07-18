const createSupplier = async (e) => {
  e.preventDefault();
  const name = e.target.supplier.value;
  const currency = e.target.currency.value;
  const enableCurrencySelect = e.target.enableCurrencySelect.checked;
  document.getElementById('loadingScreen').classList.remove('hidden');
  setTimeout(async () => {
    try {
      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ name, currency, enableCurrencySelect }),
      });
      if (response.ok) {
        alert('PROVEEDOR CREADO CORRECTAMENTE');
        window.location.href = '/manage-suppliers';
      } else {
        alert('PROVEEDOR NO CREADO');
      }
    } catch (error) {
      alert('ERROR AL CREAR PROVEEDOR', error);
    } finally {
      document.getElementById('loadingScreen').classList.add('hidden');
    }
  }, 2000);
};
