const { Expense, ExpenseParticipant, User } = require('../models');

const getBalances = async () => {
  const participants = await ExpenseParticipant.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'name'] },
      {
        model: Expense,
        include: [{ model: User, as: 'payer', attributes: ['id', 'name'] }],
      },
    ],
  });

  const balanceMap = {};

  for (const record of participants) {
    const payerId = record.Expense.paidBy;
    const payerName = record.Expense.payer.name;
    const debtorId = record.userId;
    const debtorName = record.user.name;
    const share = record.share;

    if (payerId === debtorId) continue;

    const key = `${debtorId}_${payerId}`;

    if (!balanceMap[key]) {
      balanceMap[key] = {
        debtor: debtorName,
        creditor: payerName,
        amount: 0,
      };
    }

    balanceMap[key].amount += share;
  }

  return Object.values(balanceMap);
};

const getUserBalances = async (userId) => {
  const allBalances = await getBalances();

  const users = await User.findAll({ attributes: ['id', 'name'] });
  const userMap = {};
  users.forEach((u) => (userMap[u.id] = u.name));

  const userName = userMap[userId];

  const youOwe = allBalances.filter((b) => b.debtor === userName);
  const owesYou = allBalances.filter((b) => b.creditor === userName);

  return { youOwe, owesYou };
};

module.exports = { getBalances, getUserBalances };
