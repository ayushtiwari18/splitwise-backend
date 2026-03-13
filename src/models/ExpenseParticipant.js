const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExpenseParticipant = sequelize.define('ExpenseParticipant', {
  expenseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  share: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = ExpenseParticipant;
