const selectSupplier = (e) => {
  e.preventDefault();
  console.log(e.target.value);
  const supplier = e.target.value;
  window.location.href = `/update-prices-list?sid=${supplier}`;
};

const selectItem = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;

  const item = e.target.value;
  console.log(item);
  const searchParams = new URLSearchParams(search);
  searchParams.set("item", item);
  searchParams.delete("sub_item");
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const selectSubItem = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;

  const subItem = e.target.value;
  console.log(subItem);
  const searchParams = new URLSearchParams(search);
  searchParams.set("sub_item", subItem);
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const updatePrice = async (e) => {
  e.preventDefault();
  const { search } = window.location;
  const percentage = e.target.percentage.value;
  const adjustment_type=e.target.adjustment_type.value;

  try {
    const response = await fetch(`/api/products${search}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ percentage,adjustment_type }),
    });
    if (response.ok) {
      alert("Price updated successfully");
      window.location.href = "/";
    } else {
      alert("Price update failed");
    }
  } catch (error) {
    console.log(error);
  }
};
