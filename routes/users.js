const initUserRoutes = require('express').Router();
const {
  getUsers, getUserById, updateAvatar, updateProfile, getUserInfo,
} = require('../controllers/users');
const { userIdValidation, userInfoValidation, avatarValidation } = require('../middlewares/validation');

initUserRoutes.get('/', getUsers);
initUserRoutes.get('/me', getUserInfo);
// initUserRoutes.post('/', createUser);
// initUserRoutes.post('/signup', createUser);
initUserRoutes.get('/:userId', userIdValidation, getUserById);
// initUserRoutes.post('/signin', login);
initUserRoutes.patch('/me/avatar', avatarValidation, updateAvatar);
initUserRoutes.patch('/me', userInfoValidation, updateProfile);

module.exports = initUserRoutes;
