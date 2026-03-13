// Pattern only
const userService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'name and email are required' });
    }

    const user = await userService.createUser({ name, email });
    res.status(201).json(user);
  } catch (err) {
    // handle duplicate email error specifically
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'email already exists' });
    }
    res.status(500).json({ message: 'something went wrong' });
  }
};



module.exports = { createUser };
