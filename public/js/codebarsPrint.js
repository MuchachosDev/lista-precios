const prepareForPrinting = () => {
  document
    .querySelectorAll('.no-print')
    .forEach((element) => (element.style.display = 'none'));

  const style = document.createElement('style');

  style.textContent = `
      @media print {
        @page {
          margin: 0.5cm;
          size: A4;
        }
  
        .no-print {
          display: none;
        }
      }
    `;

  document.head.appendChild(style);

  window.print();
  window.location.href = '/generate-codebars';
};

document
  .querySelector('#print-button')
  .addEventListener('click', prepareForPrinting);
