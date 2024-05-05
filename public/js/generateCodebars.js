const selectSupplier = (e) => {
  e.preventDefault();
  const supplier = e.target.value;
  window.location.href = `/generate-codebars?sid=${supplier}`;
};

const selectItem = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;

  const item = e.target.value;
  const searchParams = new URLSearchParams(search);
  searchParams.set('item', item);
  searchParams.delete('sub_item');
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const selectSubItem = (e) => {
  e.preventDefault();
  const { search, pathname } = window.location;

  const subItem = e.target.value;
  const searchParams = new URLSearchParams(search);
  searchParams.set('sub_item', subItem);
  window.location.href = `${pathname}?${searchParams.toString()}`;
};

const generateCodebars = async (e) => {
  e.preventDefault();
  const { search } = window.location;
  const codeType = e.target.codeType.value;

  const searchParams = new URLSearchParams(search);
  searchParams.set('codeType', codeType);

  window.location.href = `/codebars-print?${searchParams.toString()}`;
};
