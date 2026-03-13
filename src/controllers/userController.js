const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { name, email, password, currency } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }
    const user = await userService.createUser({ name, email, password, currency });
    const { password: _, ...safeUser } = user.toJSON();
    res.status(201).json(safeUser);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'email already exists' });
    }
    res.status(500).json({ message: 'something went wrong' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'email already exists' });
    }
    res.status(500).json({ message: 'something went wrong' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json({ message: 'user deleted' });
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser };
