const { User } = require('../models');

const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.update(data);
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return true;
};

module.exports = { createUser, getUserById, updateUser, deleteUser };
