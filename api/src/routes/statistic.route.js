const router = require('express').Router();
const { getTotals } = require('../controllers/statistic.controller');

router.route('/').get(getTotals);

module.exports = router;
