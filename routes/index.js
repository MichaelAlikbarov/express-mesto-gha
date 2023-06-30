const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { login, createUser } = require('../controllers/users');
const {
  validationLogin,
  validationCreateUser,
} = require('../middlewares/validationHandler');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use(auth);

router.use('/', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('page not found'));
});

module.exports = router;
