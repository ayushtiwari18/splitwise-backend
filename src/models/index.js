const sequelize = require('../config/database');

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

connectDB();

module.exports = sequelize;
