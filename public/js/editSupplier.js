const editSupplier = async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const sid = e.target.getAttribute('data-supplier-id');
  const currency = e.target.currency.value;
  const enableCurrencySelect = e.target.enableCurrencySelect.checked;
  document.getElementById('loadingScreen').classList.remove('hidden');
  setTimeout(async () => {
    try {
      const response = await fetch(`/api/suppliers/${sid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          currency,
          enableCurrencySelect,
        }),
      });

      if (response.ok) {
        document.getElementById('textNotification').innerHTML =
          'PROVEEDOR ACTUALIZADO CORRECTAMENTE';
        showToast();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        document.getElementById('textNotification').innerHTML =
          'PROVEEDOR NO ACTUALIZADO';
        showToast();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      alert('ERROR AL ACTUALIZAR PRODUCTO', error);
    } finally {
      document.getElementById('loadingScreen').classList.add('hidden');
    }
  }, 2000);
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
