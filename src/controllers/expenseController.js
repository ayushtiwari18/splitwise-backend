const expenseService = require('../services/expenseService');

const createExpense = async (req, res) => {
  try {
    const { name, description, amount, currency, date, paidBy, participants } = req.body;

    if (!name || !amount || !paidBy || !participants || !participants.length || !date) {
      return res.status(400).json({ message: 'name, amount, date, paidBy and participants are required' });
    }

    const expense = await expenseService.createExpense({ name, description, amount, currency, date, paidBy, participants });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

const getExpense = async (req, res) => {
  try {
    const expense = await expenseService.getExpenseById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'expense not found' });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

const listExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.listExpenses();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await expenseService.updateExpense(req.params.id, req.body);
    if (!expense) {
      return res.status(404).json({ message: 'expense not found' });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const result = await expenseService.deleteExpense(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'expense not found' });
    }
    res.status(200).json({ message: 'expense deleted' });
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

const getActivityLog = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;
    const log = await expenseService.getActivityLog(userId, startDate, endDate);
    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = { createExpense, getExpense, listExpenses, updateExpense, deleteExpense, getActivityLog };
