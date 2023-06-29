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
const {
  validationCreateUser,
  validationGetUserId,
  validationUpdateProfile,
  validationUpdateAvatar,
  validationLogin,
} = require('../middlewares/validationHandler');

router.get('/', auth, getUsers);
router.get('/users/me', auth, getUsersMe);
router.get('/users/:userId', auth, validationGetUserId, getUserId);

router.patch('/users/me', auth, validationUpdateProfile, updateProfile);
router.patch('/users/me/avatar', auth, validationUpdateAvatar, updateAvatar);

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

module.exports = router;
