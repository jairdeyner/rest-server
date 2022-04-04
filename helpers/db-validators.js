const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (rol = "") => {
  const existRol = await Role.findOne({ rol });

  if (!existRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const existsEmail = async (email = "") => {
  const existsEmail = await User.findOne({ email });

  if (existsEmail) {
    throw new Error(`El correo ya está registrado`);
  }
};

const existsUserById = async (id = "") => {
  const existUser = await User.findById(id);

  if (!existUser) {
    throw new Error(`El id no existe ${id}`);
  }
};

module.exports = {
  isValidRole,
  existsEmail,
  existsUserById,
};
