const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { login, createUser } = require('../controllers/users');
const {
  validationLogin,
  validationCreateUser,
} = require('../middlewares/validationHandler');
const auth = require('../middlewares/auth');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use(auth);
router.use('/', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;
