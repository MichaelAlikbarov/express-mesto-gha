const router = require('express').Router();
const {
  getUsers,
  getUserId,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUsersMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validationUpdateAvatar } = require('../middlewares/validationHandler');

router.get('/', auth, getUsers);
router.get('/users/me', auth, getUsersMe);
router.get('/users/:userId', auth, getUserId);

router.patch('/users/me', auth, updateProfile);
router.patch('/users/me/avatar', auth, validationUpdateAvatar, updateAvatar);

router.post('/signin', login);
router.post('/signup', createUser);

module.exports = router;
