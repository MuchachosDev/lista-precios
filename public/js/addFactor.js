const createFactor = async (e) => {
  e.preventDefault();
  const value = e.target.value.value;
  const supplier = e.target.supplier.value;
  const name = e.target.name.value;
  document.getElementById('loadingScreen').classList.remove('hidden');
  setTimeout(async () => {
    try {
      const response = await fetch('/api/factors/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value, supplier, name }),
      });
      if (response.ok) {
        alert('FACTOR CREADO CORRECTAMENTE');
        window.location.href = '/manage-factors';
      } else {
        alert('FACTOR NO CREADO');
      }
    } catch (error) {
      alert('ERROR AL CREAR PRODUCTO', error);
    } finally {
      document.getElementById('loadingScreen').classList.add('hidden');
    }
  }, 2000);
};
