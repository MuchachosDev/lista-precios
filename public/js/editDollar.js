const editDollar = async (e) => {
  e.preventDefault();

  const value = e.target.value.value;
  const name = e.target.name.value;
  const did = e.target.getAttribute("data-dolar-id");
  try {
    const response = await fetch(`/api/dollars/${did}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value, name }),
    });
    if (response.ok) {
      alert("Dollar edited");
      window.location.href = "/";
    } else {
      alert("Dollar cannot be edited");
    }
  } catch (error) {
    alert("Dollar cannot be edited");
  }
};
