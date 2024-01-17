export const getIncompletePage = async (req, res) => {
  const { incomplete } = req.query;
  try {
    return res.render("incomplete", {
      title: "Incomplete",
      incomplete,
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
