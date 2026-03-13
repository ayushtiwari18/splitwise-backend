const { Expense, ExpenseParticipant, User } = require('../models');
const { Op } = require('sequelize');

const createExpense = async (data) => {
  const { name, description, amount, currency, date, paidBy, participants } = data;

  const expense = await Expense.create({ name, description, amount, currency, date, paidBy });

  const share = parseFloat((amount / participants.length).toFixed(2));

  const records = participants.map((userId) => ({
    expenseId: expense.id,
    userId,
    share,
  }));

  await ExpenseParticipant.bulkCreate(records);

  return expense;
};

const getExpenseById = async (id) => {
  const expense = await Expense.findByPk(id, {
    include: [
      { model: User, as: 'payer', attributes: ['id', 'name', 'email'] },
      {
        model: ExpenseParticipant,
        include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }],
      },
    ],
  });
  return expense;
};

const listExpenses = async () => {
  const expenses = await Expense.findAll({
    include: [
      { model: User, as: 'payer', attributes: ['id', 'name'] },
      {
        model: ExpenseParticipant,
        include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
      },
    ],
    order: [['date', 'DESC']],
  });
  return expenses;
};

const updateExpense = async (id, data) => {
  const expense = await Expense.findByPk(id);
  if (!expense) return null;
  await expense.update(data);
  return expense;
};

const deleteExpense = async (id) => {
  const expense = await Expense.findByPk(id);
  if (!expense) return null;
  await ExpenseParticipant.destroy({ where: { expenseId: id } });
  await expense.destroy();
  return true;
};

const getActivityLog = async (userId, startDate, endDate) => {
  const now = new Date();

  const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const participantExpenses = await ExpenseParticipant.findAll({
    where: { userId },
    attributes: ['expenseId'],
  });

  const expenseIds = participantExpenses.map((p) => p.expenseId);

  const whereClause = { id: { [Op.in]: expenseIds } };

  if (startDate && endDate) {
    whereClause.date = { [Op.between]: [startDate, endDate] };
  }

  const expenses = await Expense.findAll({
    where: whereClause,
    include: [
      { model: User, as: 'payer', attributes: ['id', 'name'] },
      {
        model: ExpenseParticipant,
        include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
      },
    ],
    order: [['date', 'DESC']],
  });

  if (startDate && endDate) {
    return { custom: expenses };
  }

  const thisMonth = expenses.filter((e) => new Date(e.date) >= firstDayThisMonth);
  const lastMonth = expenses.filter(
    (e) => new Date(e.date) >= firstDayLastMonth && new Date(e.date) <= lastDayLastMonth
  );

  return { thisMonth, lastMonth };
};

module.exports = { createExpense, getExpenseById, listExpenses, updateExpense, deleteExpense, getActivityLog };
