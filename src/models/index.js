const sequelize = require('../config/database');
const User = require('./User');
const Expense = require('./Expense');
const ExpenseParticipant = require('./ExpenseParticipant');

User.hasMany(Expense, { foreignKey: 'paidBy' });
Expense.belongsTo(User, { foreignKey: 'paidBy', as: 'payer' });

Expense.hasMany(ExpenseParticipant, { foreignKey: 'expenseId' });
ExpenseParticipant.belongsTo(Expense, { foreignKey: 'expenseId' });

ExpenseParticipant.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(ExpenseParticipant, { foreignKey: 'userId' });

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

module.exports = { sequelize, User, Expense, ExpenseParticipant };
