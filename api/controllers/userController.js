const userService = require('../services/userService');

exports.register = async (request, response, next) => {
  try {
    const data = await userService.register(request.body);
    response.json({ data });
  } catch (error) {
    next(error);
  }
};

exports.login = async (request, response, next) => {
  try {
    const data = await userService.login(request.body);

    response.cookie('token', data.token, {
      httpOnly: true,
      secure: (process.env.NODE_ENV === 'production'),
      sameSite: 'strict',
    });

    response.json({ data: { token: data.token } });
  } catch (error) {
    next(error);
  }
};

exports.verify = async (request, response, next) => {
  try {
    const data = await userService.verify(request.cookies.token) || null;

    if (data.refresh) {
      response.cookie('token', data.refresh, {
        httpOnly: true,
        secure: (process.env.NODE_ENV === 'production'),
        sameSite: 'strict',
      });
      delete data.refresh;
    }

    request.user = data;
    next();
  } catch (error) {
    next(error);
  }
};

exports.revoke = async (request, response, next) => {
  try {
    const data = await userService.revoke(request.user.id);
    response.clearCookie('token');
    response.json({ data });
  } catch (error) {
    next(error);
  }
};
