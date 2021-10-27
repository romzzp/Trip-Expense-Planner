const router = require('express').Router();
const userRoutes = require('./userRoutes');
const destinationRoutes = require('./destinationRoutes');
const tripRoutes = require('./tripRoutes');

router.use('/users', userRoutes);
router.use('/destination', destinationRoutes);
router.use('/trip', tripRoutes);

module.exports = router;
