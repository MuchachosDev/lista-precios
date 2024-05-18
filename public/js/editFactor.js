const editFactor = async (e) => {
  e.preventDefault();
  const sid = e.target.supplier.value;
  const name = e.target.name.value;
  const value = e.target.value.value;
  const fid = e.target.getAttribute('data-factor-id');
  try {
    const response = await fetch(`/api/factors/${fid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value,
        name,
        sid,
      }),
    });

    if (response.ok) {
      document.getElementById('textNotification').innerHTML =
        'FACTOR ACTUALIZADO CORRECTAMENTE';
      showToast();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      document.getElementById('textNotification').innerHTML =
        'FACTOR NO ACTUALIZADO';
        showToast();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
    }
  } catch (error) {
    alert('ERROR AL ACTUALIZAR FACTOR', error);
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
