const searchProduct = (e) => {
  e.preventDefault();
  const filter = e.target.filter.value;
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
  e.preventDefault();
  let key = e.key;

  if (['Backspace', 'Enter', 'Escape'].includes(key)) {
    e.preventDefault();
  }

  if (e.ctrlKey) {
    if (key === 'c' || key === 'C') {
      return;
    }
    if (key === 'v' || key === 'V') {
      return;
    }
  }

  switch (key) {
    case 'Backspace':
      input.value = input.value.slice(0, -1);
      break;
    case 'Enter':
      window.location.href = `/list-products?filter=${input.value}`;
      break;
    case 'Escape':
      input.value = '';
      break;
    case 'Control':
    case 'Alt':
    case 'Shift':
    case 'CapsLock':
    case 'Tab':
    case 'Meta':
      break;
    default:
      if (key.length === 1 && !e.ctrlKey) {
        input.value += key;
      }
      break;
  }
});

const copyDetail = async (e) => {
  let target;
  if(e.target.tagName === 'svg') {
    target = e.target.parentElement;
  } else {
    target = e.target;
  }

  const description = target.getAttribute('data-product-description');
  const model = target.getAttribute('data-product-model');
  const brand = target.getAttribute('data-product-brand');
  const presentation = target.getAttribute('data-product-presentation');

  console.log(description, model, brand, presentation);
try{
  await navigator.clipboard.writeText(`${description} ${model} ${brand} x ${presentation}`);
  console.log("Copiado al portapapeles");
} catch (error){
  alert('No se pudo copiar al portapapeles');
}
};
