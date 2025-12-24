const ADMIN_USER = {
  username: "admin",
  password: "123456"
};

module.exports = (req, res) => {
  const { username, password } = req.body;

  if (
    username === ADMIN_USER.username &&
    password === ADMIN_USER.password
  ) {
    return res.status(200).json({
      token: "admin-token-fixo"
    });
  }

  return res.status(401).json({
    message: "Credenciais inválidas"
  });
};
