const userController = require('../controllers/userController');

module.exports = (route) => {
  route.post('/user/register', userController.register);
  route.post('/user/login', userController.login);
  route.post('/user/revoke', route.auth, userController.revoke);
};
