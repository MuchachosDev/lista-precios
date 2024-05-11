const editDollar = async (e) => {
  e.preventDefault();

  const value = e.target.value.value;
  const name = e.target.name.value;
  const did = e.target.getAttribute('data-dolar-id');
  try {
    const response = await fetch(`/api/dollars/${did}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value, name }),
    });
    if (response.ok) {
      document.getElementById('textNotification').innerHTML =
        'Dólar actualizado correctamente';
      showToast();
    } else {
      document.getElementById('textNotification').innerHTML =
        'Dólar no actualizado';
      showToast();
    }
  } catch (error) {
    alert('Error al actualizar dolar', error);
  }
};

const showToast = () => {
  const toast = document.getElementById('toast');
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 5000);
};

const closeToast = () => {
  const closeButton = document.querySelector('[data-dismiss-target]');
  closeButton.addEventListener('click', function () {
    const target = this.getAttribute('data-dismiss-target');
    document.querySelector(target).classList.add('hidden');
  });
};

closeToast();
