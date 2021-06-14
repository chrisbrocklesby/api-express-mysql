const { validate, schema } = require('../utils/validate');

const User = schema.object({
  id: schema.number(),
  email: schema.string().email(),
  password: schema.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  key: schema.string().alphanum().length(8),
  token: schema.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/),
});

module.exports = (data, require) => validate(User, data, require);
