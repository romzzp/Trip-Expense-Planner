const router = require('express').Router();
const userRoutes = require('./userRoutes');
const destinationRoutes = require('./destinationRoutes');
const tripRoutes = require('./tripRoutes');
const expensesRoutes = require('./expensesRoutes');

router.use('/users', userRoutes);
router.use('/destination', destinationRoutes);
router.use('/trip', tripRoutes);
router.use('/expenses',expensesRoutes);

module.exports = router;
