const deleteSupplier = async (e) => {
  const sid = e.target.getAttribute('data-supplier-id');

  const userConfirmed = await showModalConfirmation();

  if (!userConfirmed) {
    alert('Eliminación cancelada');
    return;
  }

  try {
    const response = await fetch(`/api/suppliers/${sid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      alert('Proveedor eliminado correctamente');
      window.location.reload();
    } else {
      const error = await response.json();
      alert('Proveedor no eliminado');
    }
  } catch (error) {
    alert('Error al eliminar proveedor');
  }
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
