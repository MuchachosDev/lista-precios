const searchProduct = (e) => {
  e.preventDefault();
  const filter = e.target.filter.value;
  console.log(filter);
  if (filter) {
    window.location.href = `/list-products?filter=${filter}`;
  } else {
    window.location.href = `/list-products`;
  }
};

const limitChange = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;
  const limit = e.target.value;

  const searchParams = new URLSearchParams(search);
  searchParams.set("limit", limit);
  window.location.href = `${pathname}?${searchParams.toString()}`;
};
