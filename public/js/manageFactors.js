const deleteFactor = async (e) => {
  const fid = e.target.getAttribute('data-factor-id');

  const userConfirmed = await showModalConfirmation();

  if (!userConfirmed) {
    alert('Eliminación cancelada');
    return;
  }

  try {
    const response = await fetch(`/api/factors/${fid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      alert('Factor eliminado correctamente');
      window.location.reload();
    } else {
      const error = await response.json();
      alert('Factor no eliminado');
    }
  } catch (error) {
    alert('Error al eliminar factor');
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
