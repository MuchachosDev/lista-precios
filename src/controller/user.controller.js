export const getUser = async (req, res) => {
  req.logger.info("Hello from getUser");
  res.send("Hello from getUser");
};
