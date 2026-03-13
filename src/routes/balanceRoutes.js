const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceController');

router.get('/', balanceController.getAllBalances);
router.get('/:userId', balanceController.getUserBalances);

module.exports = router;
