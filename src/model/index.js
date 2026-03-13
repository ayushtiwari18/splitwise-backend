// Pattern only
const sequelize = require('../config/database');

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection failed:', err.message);
  }
};

testConnection();

module.exports = sequelize;
