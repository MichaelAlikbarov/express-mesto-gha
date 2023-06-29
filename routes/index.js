const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;
