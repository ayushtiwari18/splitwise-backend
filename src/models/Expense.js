const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('Expense', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'INR',
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  paidBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Expense;
