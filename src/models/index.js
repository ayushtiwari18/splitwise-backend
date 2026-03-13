// Pattern only
const sequelize = require('../config/database');
const User = require('./User');

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); 
    console.log('Database connected and synced');
  } catch (err) {
    console.error('DB error:', err.message);
    process.exit(1);
  }
};

connectDB();

module.exports = { sequelize, User };
