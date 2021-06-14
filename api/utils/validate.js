const Joi = require('joi');

module.exports = {
  schema: Joi,
  validate: (model, data, required = []) => {
    let schema = model;
    if (required.length) schema = schema.fork(required, (field) => field.required());
    const { error } = schema.validate(data);
    if (error) {
      const validationError = new Error(error.message);
      validationError.name = 'validationError';
      throw validationError;
    }
  },
};
