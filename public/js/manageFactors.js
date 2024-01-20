const deleteFactor = async (e) => {
  const fid = e.target.getAttribute("data-factor-id");

  try {
    const response = await fetch(`/api/factors/${fid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("Factor deleted successfully");
      window.location.reload();
    } else {
      const error = await response.json();
      alert(error.error.message);
    }
  } catch (error) {
    alert(error);
  }
};
