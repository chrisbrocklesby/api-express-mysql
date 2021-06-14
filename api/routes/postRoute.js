const postController = require('../controllers/postController');

module.exports = (route) => {
  route.get('/posts', route.auth, postController.index);
  route.get('/posts/:id', route.auth, postController.find);
  route.post('/posts', route.auth, postController.create);
  route.patch('/posts/:id', route.auth, postController.update);
  route.delete('/posts/:id', route.auth, postController.delete);
};
