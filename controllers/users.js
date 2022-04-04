const bcrypjs = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const resp = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  const [total, users] = resp;

  res.status(200).json({
    total,
    users,
  });
};

const usersPost = async (req, res) => {
  const { name, email, password, rol } = req.body;

  const user = new User({ name, email, password, rol });

  // Encriptar la contraseña
  const salt = bcrypjs.genSaltSync(10);
  user.password = bcrypjs.hashSync(password, salt);

  // Insert DB
  await user.save();

  res.json({
    user,
  });
};

const usersPut = async (req, res) => {
  const id = req.params.id;
  const { _id, password, google, email, ...otherAttributes } = req.body;

  // Validar contra BD
  if (password) {
    // Encriptar la contraseña
    const salt = bcrypjs.genSaltSync(10);
    otherAttributes.password = bcrypjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, otherAttributes);

  res.json(user);
};

const usersDelete = async (req, res) => {
  const { id } = req.params;

  // Fisicamente lo borramos
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json(user);
};

const usersPatch = (req, res) => {
  res.json({
    msg: "patch API - controller",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
};
