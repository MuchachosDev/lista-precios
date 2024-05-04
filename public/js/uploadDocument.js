const sendDocument = async (e) => {
  e.preventDefault();
  document.getElementById('loadingScreen').classList.remove('hidden');

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
      alert('File uploaded successfully');
      window.location.href = '/';
    } else {
      alert('File upload failed');
    }
  } catch (error) {
    alert(error);
  } finally {
    document.getElementById('loadingScreen').classList.add('hidden');
  }
};
