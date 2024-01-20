const editSupplier = async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const sid = e.target.getAttribute("data-supplier-id");

  console.log(name, sid);
  try {
    const response = await fetch(`/api/suppliers/${sid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    if (response.ok) {
      alert("Supplier updated successfully");
      window.location.href = "/manage-suppliers";
    } else {
      alert("Supplier not updated");
    }
  } catch (error) {
    alert(error);
  }
};
