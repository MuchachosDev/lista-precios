const createFactor = async (e) => {
  e.preventDefault();
  const value = e.target.value.value;
  const supplier = e.target.supplier.value;
  try {
    const response = await fetch("/api/factors/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value, supplier }),
    });
    if (response.ok) {
      alert("Factor created successfully");
      window.location.href = "/";
    } else {
      alert("Factor creation failed");
    }
  } catch (error) {
    alert(error);
  }
};
