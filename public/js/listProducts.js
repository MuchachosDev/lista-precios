const searchProduct = async (e) => {
  e.preventDefault();
  const filter = await e.target.filter.value;
  if (filter) {
    window.location.href = `/list-products?filter=${filter}`;
  } else {
    window.location.href = `/list-products`;
  }
};

const limitChange = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;
  const limit = e.target.value;

  const searchParams = new URLSearchParams(search);
  searchParams.set('limit', limit);
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const sortPrice = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;

  const sort = e.target.value;

  const searchParams = new URLSearchParams(search);
  if (!sort) {
    searchParams.delete('sort');
    window.location.href = `${pathname}?${searchParams.toString()}`;
    return;
  }
  searchParams.set('sort', sort);
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const filterBrand = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;

  const brand = e.target.brand.value;

  const searchParams = new URLSearchParams(search);
  searchParams.set('brand', brand);
  searchParams.delete('page');
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const deleteFilterBrand = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;
  const searchParams = new URLSearchParams(search);
  searchParams.delete('brand');
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const input = document.getElementById('inputSearch');

const maintainFocus = () => {
  setTimeout(() => input.focus(), 10);
}

window.onload = maintainFocus;
input.onblur = maintainFocus;

const copyDetail = async (e) => {
  e.preventDefault();
  let target = e.target;
  while (!target.id) {
    target = target.parentNode;
  }
  const description = target.getAttribute('data-product-description');
  const model = target.getAttribute('data-product-model');
  const brand = target.getAttribute('data-product-brand');
  const presentation = target.getAttribute('data-product-presentation');
  try {
    await navigator.clipboard.writeText(
      `${description} ${model} ${brand} x ${presentation}`
    );

    document.getElementById('textNotification').innerHTML =
      'DETALLE COPIADO CORRECTAMENTE';
    showToast();
  } catch (error) {
    alert('ERROR AL COPIAR DETALLE', error);
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
