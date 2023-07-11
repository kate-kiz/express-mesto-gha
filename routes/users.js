const initUserRoutes = require('express').Router();
const {
  getUsers, getUserById, createUser, updateAvatar, updateProfile,
} = require('../controllers/users');

initUserRoutes.get('/', getUsers);
initUserRoutes.post('/', createUser);
initUserRoutes.get('/:userId', getUserById);
initUserRoutes.patch('/me/avatar', updateAvatar);
initUserRoutes.patch('/me', updateProfile);

module.exports = initUserRoutes;
