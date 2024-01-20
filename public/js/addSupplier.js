const createSupplier = async (e) => {
  e.preventDefault();
  const supplier = e.target.supplier.value;

  try {
    const response = await fetch("/api/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ supplier }),
    });
    if (response.ok) {
      alert("Supplier created successfully");
      window.location.href = "/";
    } else {
      alert("Supplier not created");
    }
  } catch (error) {
    alert(error);
  }
};
