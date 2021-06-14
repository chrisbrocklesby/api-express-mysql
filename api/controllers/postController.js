const postService = require('../services/postService');

exports.index = async (request, response, next) => {
  try {
    const data = await postService.index(request.query.page);
    response.json({ data });
  } catch (error) {
    next(error);
  }
};

exports.find = async (request, response, next) => {
  try {
    const data = await postService.find(request.params.id);
    if (!data) { next(); } else { response.json({ data }); }
  } catch (error) {
    next(error);
  }
};

exports.create = async (request, response, next) => {
  try {
    const data = await postService.create(request.body);
    response.json({ data });
  } catch (error) {
    next(error);
  }
};

exports.update = async (request, response, next) => {
  try {
    const data = await postService.update(request.params.id, request.body);
    if (!data) { next(); } else { response.json({ data }); }
  } catch (error) {
    next(error);
  }
};

exports.delete = async (request, response, next) => {
  try {
    const data = await postService.delete(request.params.id);
    if (!data) { next(); } else { response.json({ data }); }
  } catch (error) {
    next(error);
  }
};
