let previewSupplier;

document.addEventListener('DOMContentLoaded', () => {
  previewSupplier = document.getElementById('supplier').value;
});

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
const selectSupplier = async (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;
  const supplier = e.target.value;
  const searchParams = new URLSearchParams(search);
  searchParams.set('sid', supplier);
  const userConfirmation = await showModalConfirmation();

  if (!userConfirmation) {
    document.getElementById('supplier').value = previewSupplier;
    return;
  }
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const showItemModal = () => {
  document.getElementById('itemModal').classList.remove('hidden');
};

const hideItemModal = () => {
  document.getElementById('itemModal').classList.add('hidden');
  document.getElementById('newItemInput').value = '';
};

const createNewItem = () => {
  const newItemName = document.getElementById('newItemInput').value.trim();
  if (newItemName) {
    const option = document.createElement('option');
    option.value = newItemName;
    option.selected = true;
    option.text = newItemName;
    document.getElementById('item').appendChild(option);
    hideItemModal();
  }
};

const showSubItemModal = () => {
  document.getElementById('subItemModal').classList.remove('hidden');
};

const hideSubItemModal = () => {
  document.getElementById('subItemModal').classList.add('hidden');
  document.getElementById('newSubItemInput').value = '';
};

const createNewSubItem = () => {
  const newSubItemName = document
    .getElementById('newSubItemInput')
    .value.trim();
  if (newSubItemName) {
    const option = document.createElement('option');
    option.value = newSubItemName;
    option.selected = true;
    option.text = newSubItemName;
    document.getElementById('sub_item').appendChild(option);
    hideSubItemModal();
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

const editProduct = async (e) => {
  e.preventDefault();
  const pid = e.target.getAttribute('data-product-id');
  const model = e.target.model.value;
  const description = e.target.description.value;
  const barCode = e.target.bar_code.value;
  const sku = e.target.sku.value;
  const brand = e.target.brand.value;
  const presentation = e.target.presentation.value;
  const iva = e.target.iva.value;
  const price_list = e.target.price_list.value;
  const supplier = e.target.supplier.value;
  const item = e.target.item.value;
  const sub_item = e.target.sub_item.value;
  const factor = e.target.factor.value;

  const data = {
    model,
    description,
    bar_code: barCode,
    sku,
    brand,
    presentation,
    iva,
    price_list,
    supplier,
    item,
    sub_item,
    factor,
  };

  const userConfirmation = await showModalConfirmation();

  if (!userConfirmation) {
    return;
  }

  document.getElementById('loadingScreen').classList.remove('hidden');

  setTimeout(async () => {
    try {
      const response = await fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        document.getElementById('textNotification').innerHTML =
          'PRODUCTO ACTUALIZADO CORRECTAMENTE';
        showToast();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        document.getElementById('textNotification').innerHTML =
          'PRODUCTO NO ACTUALIZADO';
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

const handleFinalPrice = (e) => {
  e.preventDefault();
  const price_list = parseFloat(document.getElementById('price_list').value);
  const iva = parseFloat(document.getElementById('iva').value);
  const factor = parseFloat(
    document
      .getElementById('factor')
      .value.substring(document.getElementById('factor').value.indexOf('-') + 1)
      .trim()
  );

  document.getElementById('final_price').textContent =
    `$${(price_list * (iva / 100 + 1) * factor).toFixed(2)}`;
};

const handlePreventSubmit = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};
