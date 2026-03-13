const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const expenseRoutes = require('./expenseRoutes');
const balanceRoutes = require('./balanceRoutes');

router.use('/users', userRoutes);
router.use('/expenses', expenseRoutes);
router.use('/balances', balanceRoutes);

module.exports = router;
