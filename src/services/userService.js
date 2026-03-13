// Pattern only — implement all four yourself
const { User } = require('../models');

const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};

const getUserById = async (id) => {
  // use User.findByPk(id)
};

const updateUser = async (id, data) => {
  // find user first, then call user.update(data)
};

const deleteUser = async (id) => {
  // find user first, then call user.destroy()
};

module.exports = { createUser, getUserById, updateUser, deleteUser };
