const sendDocument = async (e) => {
  e.preventDefault();
  document.getElementById('loadingScreen').classList.remove('hidden');

  if (e.target.file.files.length === 0) {
    alert('POR FAVOR, SELECCIONE UN ARCHIVO');
    document.getElementById('loadingScreen').classList.add('hidden');
    return;
  }

  const factor = e.target.factor.value;
  const formData = new FormData();
  formData.append('factor', factor.substring(0, factor.indexOf('-')));
  formData.append('sid', factor.substring(factor.indexOf('-') + 1));
  formData.append('file', e.target.file.files[0], e.target.file.files[0].name);

  try {
    const response = await fetch('/api/products/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const { payload } = await response.json();
      alert(payload.message);

      if (payload.duplicateProducts && payload.duplicateProducts.length > 0) {
        const blob = new Blob(
          [JSON.stringify(payload.duplicateProducts, null, 2)],
          { type: 'application/json' }
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'duplicate_products.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      window.location.href = '/upload-document';
    } else {
      alert('ARCHIVO NO SUBIDO');
    }
  } catch (error) {
    alert('ERROR AL SUBIR EL ARCHIVO', error);
  } finally {
    document.getElementById('loadingScreen').classList.add('hidden');
  }
};
