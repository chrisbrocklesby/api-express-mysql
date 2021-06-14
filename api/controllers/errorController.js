exports.notFound = (request, response, next) => {
  response
    .status(404)
    .json({
      error: {
        status: 404,
        name: 'notFound',
        message: 'Not found',
      },
    });
  next();
};

exports.error = (error, request, response, next) => {
  const codes = {
    badRequest: 400,
    validationError: 400,
    authError: 401,
  };
  const status = codes[error.name] || error.status || 500;

  response
    .status(status)
    .json({
      error: {
        status,
        name: error.name || 'error',
        message: error.message || 'error',
      },
    });
  next();
};
