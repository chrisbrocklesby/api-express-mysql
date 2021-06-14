const { validate, schema } = require('../utils/validate');

const Post = schema.object({
  id: schema.number(),
  title: schema.string().min(2),
  body: schema.string(),
});

module.exports = (data, require) => validate(Post, data, require);
