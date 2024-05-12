const searchProduct = async(e) => {
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

document.addEventListener('keydown', (e) => {
  const key = e.key;
  const isModifierKey = key === 'Control' || key === 'Alt' || key === 'Shift' || key === 'CapsLock' || key === 'Tab' || key === 'Meta' || key=== 'ArrowLeft' || key=== 'ArrowRight' || key=== 'ArrowUp' || key=== 'ArrowDown';
  const allowedKeys = /^[a-zA-Z0-9\s,.-]*$/;
  if ((e.ctrlKey || e.metaKey) && (key === 'c' || key === 'x' || key === 'v')) {
    return;
  }
  if (['Backspace', 'Enter', 'Escape'].includes(key)) {
    e.preventDefault();
  }
  if (key === 'Backspace') {
    input.value = input.value.slice(0, -1);
  } else if (key === 'Enter') {
    window.location.href = `/list-products?filter=${encodeURIComponent(input.value)}`;
  } else if (key === 'Escape') {
    input.value = '';
  } else if (allowedKeys.test(key) && !isModifierKey) {
    input.value += key;
  }
  console.log(typeof key);
  e.preventDefault();
});


const copyDetail = async (e) => {
  e.preventDefault();
  let target=e.target;
  while(!target.id){
    target=target.parentNode;
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
      'Detalle copiado al portapapeles';
    showToast();
  } catch (error) {
    alert('Error al copiar detalle', error);
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
