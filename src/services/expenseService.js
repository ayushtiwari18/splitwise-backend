const { Expense, ExpenseParticipant, User } = require('../models');

const createExpense = async (data) => {
  const { description, amount, paidBy, participants } = data;

  const expense = await Expense.create({ description, amount, paidBy });

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

module.exports = { createExpense, getExpenseById, listExpenses, updateExpense, deleteExpense };
