const editFactor = async (e) => {
  e.preventDefault();
  const sid = e.target.supplier.value;
  const name = e.target.name.value;
  const value = e.target.value.value;
  const fid = e.target.getAttribute('data-factor-id');
  try {
    const response = await fetch(`/api/factors/${fid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value,
        name,
        sid,
      }),
    });

    if (response.ok) {
      alert('Factor updated successfully');
      window.location.href = '/manage-factors';
    } else {
      alert('Factor not updated');
    }
  } catch (error) {
    alert(error);
  }
};
