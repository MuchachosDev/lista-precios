export const loginPage = (req, res) => {
  const { failSession } = req.query;
  return res.render('login', {
    title: 'INICIO DE SESIÓN',
    failSession,
  });
};
