const deleteSupplier = async (e) => {
  const sid = e.target.getAttribute('data-supplier-id');

  const userConfirmed = await showModalConfirmation();

  if (!userConfirmed) {
    alert('ELIMINACIÓN CANCELADA');
    return;
  }
  document.getElementById('loadingScreen').classList.remove('hidden');
  setTimeout(async () => {
    try {
      const response = await fetch(`/api/suppliers/${sid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        alert('PROVEEDOR ELIMINADO CORRECTAMENTE');
        window.location.reload();
      } else {
        const error = await response.json();
        alert('PROVEEDOR NO ELIMINADO');
      }
    } catch (error) {
      alert('ERROR AL ELIMINAR PROVEEDOR', error);
    } finally {
      document.getElementById('loadingScreen').classList.add('hidden');
    }
  }, 2000);
};

const showModalConfirmation = () => {
  return new Promise((resolve) => {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('hidden');

    document.getElementById('confirmBtn').onclick = () => {
      modal.classList.add('hidden');
      resolve(true);
    };

    document.getElementById('cancelBtn').onclick = () => {
      modal.classList.add('hidden');
      resolve(false);
    };
  });
};
