const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const userValidator = require('../validators/userValidator');

exports.register = async (data) => {
  userValidator(data, ['email', 'password']);

  if (await userModel.selectByEmail(data.email)) {
    throw Object({
      name: 'badRequest',
      message: 'User email already exists',
    });
  }

  const user = await userModel.insert({
    email: data.email,
    password: await bcrypt.hash(data.password, 10),
  });
  delete user.password;
  return user;
};

exports.login = async (data) => {
  userValidator(data, ['email', 'password']);

  const key = Math.random().toString(16).substr(2, 8);

  const user = await userModel.selectByEmail(data.email);
  if (!user) {
    throw Object({
      name: 'authError',
      message: 'User email doesn’t exist',
    });
  }

  if (!user.key) {
    await userModel.update(user.id, { key });
  }

  const password = await bcrypt.compare(data.password, user.password);
  if (!password) {
    throw Object({
      name: 'authError',
      message: 'User password is invalid',
    });
  }

  delete user.password;
  return {
    token: jwt.sign({
      id: user.id,
      key: user.key || key,
    }, process.env.JWT_ACCESS_KEY || '', { expiresIn: process.env.JWT_ACCESS_EXPIRE || '1m' }),
  };
};

exports.verify = async (token) => {
  userValidator({ token }, ['token']);
  try {
    return await jwt.verify(token, process.env.JWT_ACCESS_KEY || '');
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const decode = await jwt.verify(token, process.env.JWT_ACCESS_KEY || '', { ignoreExpiration: true });
      const user = await userModel.selectById(decode.id);

      if (decode.key === user.key) {
        return {
          ...decode,
          refresh: jwt.sign({
            id: decode.id,
            key: decode.key,
          }, process.env.JWT_ACCESS_KEY || '', { expiresIn: process.env.JWT_ACCESS_EXPIRE || '1m' }),
        };
      }
      throw Object({
        name: 'authError',
        message: 'Token has been revoked',
      });
    }

    throw Object({
      name: 'authError',
      message: error.message || 'Auth Token Error',
    });
  }
};

exports.revoke = async (id) => {
  userValidator({ id }, ['id']);
  await userModel.update(id, { key: null });
  return { id };
};
