const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const expenseRoutes = require('./expenseRoutes');

router.use('/users', userRoutes);
router.use('/expenses', expenseRoutes);

module.exports = router;
