const editCurrency = async (e) => {
  e.preventDefault();

  const value = e.target.value.value;
  const name = e.target.name.value;
  const did = e.target.getAttribute('data-dolar-id');
  try {
    const response = await fetch(`/api/currencys/${did}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value, name }),
    });
    if (response.ok) {
      document.getElementById('textNotification').innerHTML =
        'MONEDA ACTUALIZADA CORRECTAMENTE';
      showToast();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      document.getElementById('textNotification').innerHTML =
        'MONEDA NO ACTUALIZADO';
      showToast();
    }
  } catch (error) {
    alert('ERROR AL ACTUALIZAR MONEDA', error);
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
