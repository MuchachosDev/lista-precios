const sendDocument = async (e) => {
  e.preventDefault();

  document.getElementById("loadingScreen").classList.remove("hidden");

  const formData = new FormData();
  formData.append("factor", e.target.factor.value);
  formData.append("file", e.target.file.files[0], e.target.file.files[0].name);

  try {
    const response = await fetch("/api/files/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("File uploaded successfully");
      window.location.href = "/";
    } else {
      alert("File upload failed");
    }
  } catch (error) {
    alert(error);
  } finally {
    document.getElementById("loadingScreen").classList.add("hidden");
  }
};
