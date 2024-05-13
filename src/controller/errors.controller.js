export const getIncompletePage = async (req, res) => {
  const { incomplete } = req.query;
  try {
    return res.render('incomplete', {
      title: 'INCOMPLETO',
      incomplete: incomplete.toUpperCase(),
    });
  } catch (error) {
    return res.sendClientError(error);
  }
};
