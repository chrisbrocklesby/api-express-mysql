const postModel = require('../models/postModel');
const postValidator = require('../validators/postValidator');

exports.index = async (page) => {
  const posts = await postModel.select(page);
  return posts;
};

exports.find = async (id) => {
  postValidator({ id }, ['id']);
  const post = await postModel.selectById(id);
  return post;
};

exports.create = async (data) => {
  postValidator(data, ['title', 'body']);
  const post = await postModel.insert(data);
  return post;
};

exports.update = async (id, data) => {
  postValidator(data, ['id']);
  const post = await postModel.update(id, data);
  return post;
};

exports.delete = async (id) => {
  postValidator({ id }, ['id']);
  const post = await postModel.delete(id);
  return post;
};
