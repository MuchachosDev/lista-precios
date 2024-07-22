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
let isInputFocused = false;
let caretPosition = 0;

input.addEventListener('focus', () => {
  isInputFocused = true;
});

input.addEventListener('blur', () => {
  isInputFocused = false;
});

const updateCaretPosition = (newPosition) => {
  caretPosition = newPosition;
  input.setSelectionRange(caretPosition, caretPosition);
};

document.addEventListener('keydown', (event) => {
  if (!isInputFocused) {
    input.focus();
    input.setSelectionRange(caretPosition, caretPosition);

    if (event.key === 'Enter') {
      event.preventDefault();
      input.form.submit();
    } else if (event.key === 'Backspace') {
      event.preventDefault();
      const start = input.selectionStart;
      const end = input.selectionEnd;
      if (start !== end) {
        input.setRangeText('', start, end, 'end');
      } else if (start > 0) {
        input.setRangeText('', start - 1, start, 'end');
      }
      updateCaretPosition(input.selectionStart);
    } else if (event.key === 'Delete') {
      event.preventDefault();
      const start = input.selectionStart;
      const end = input.selectionEnd;
      if (start !== end) {
        input.setRangeText('', start, end, 'end');
      } else if (start < input.value.length) {
        input.setRangeText('', start, start + 1, 'end');
      }
      updateCaretPosition(input.selectionStart);
    } else if (
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'Home' ||
      event.key === 'End' ||
      event.key === 'PageUp' ||
      event.key === 'PageDown' ||
      event.key === 'Tab' ||
      event.key === 'AltGraph'
    ) {
      // Permitir el funcionamiento habitual de las teclas de navegación
    } else if (event.ctrlKey || event.metaKey) {
      // Permitir combinaciones de teclas como Ctrl+C, Ctrl+V, etc.
    } else {
      event.preventDefault();
      const start = input.selectionStart;
      const end = input.selectionEnd;
      input.setRangeText(event.key, start, end, 'end');
      updateCaretPosition(input.selectionStart + 1);
    }
  }
});

input.addEventListener('click', () => {
  isInputFocused = true;
});

input.addEventListener('input', () => {
  caretPosition = input.selectionStart;
});

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

const tooltips = document.querySelectorAll('.tooltip');

tooltips.forEach((tooltip) => {
  const td = tooltip.closest('td');

  td.addEventListener('mouseover', (e) => {
    const description = tooltip.previousElementSibling;
    if (description.offsetWidth < description.scrollWidth) {
      tooltip.classList.remove('hidden');
    }
  });

  td.addEventListener('mousemove', (e) => {
    if (!tooltip.classList.contains('hidden')) {
      const x = e.clientX;
      const y = e.clientY;
      tooltip.style.left = `${x + 20}px`;
      tooltip.style.top = `${y + 20}px`;
    }
  });

  td.addEventListener('mouseout', () => {
    tooltip.classList.add('hidden');
  });
});
