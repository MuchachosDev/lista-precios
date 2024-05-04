const deleteSupplier = async (e) => {
  const sid = e.target.getAttribute('data-supplier-id');
  try {
    const response = await fetch(`/api/suppliers/${sid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      alert('Supplier deleted successfully');
      window.location.reload();
    } else {
      const error = await response.json();
      alert(error.error.message);
    }
  } catch (error) {
    alert(error);
  }
};
