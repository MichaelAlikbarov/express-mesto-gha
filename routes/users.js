const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateProfile,
  updateAvatar,
  getUsersMe,
} = require('../controllers/users');
const {
  validationGetUserId,
  validationUpdateProfile,
  validationUpdateAvatar,
} = require('../middlewares/validationHandler');

router.get('/', getUsers);
router.get('/users/me', getUsersMe);
router.get('/users/:userId', validationGetUserId, getUserId);

router.patch('/users/me', validationUpdateProfile, updateProfile);
router.patch('/users/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
