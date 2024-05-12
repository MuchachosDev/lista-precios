const sendDocument = async (e) => {
  e.preventDefault();
  document.getElementById('loadingScreen').classList.remove('hidden');

  if (e.target.file.files.length === 0) {
    alert('Please select a file');
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
      const {payload} = await response.json();
      alert(payload.message);
      window.location.href = '/upload-document';
    } else {
      alert('Archivo no subido');
    }
  } catch (error) {
    alert('Error al subir archivo', error);
  } finally {
    document.getElementById('loadingScreen').classList.add('hidden');
  }
};
