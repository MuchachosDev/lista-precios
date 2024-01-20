const editDollar = async (e) => {
  e.preventDefault();

  const value = e.target.value.value;
  try {
    const response = await fetch("/api/dollar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
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
