const balanceService = require('../services/balanceService');

const getAllBalances = async (req, res) => {
  try {
    const balances = await balanceService.getBalances();
    res.status(200).json(balances);
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

const getUserBalances = async (req, res) => {
  try {
    const balances = await balanceService.getUserBalances(req.params.userId);
    res.status(200).json(balances);
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

module.exports = { getAllBalances, getUserBalances };
