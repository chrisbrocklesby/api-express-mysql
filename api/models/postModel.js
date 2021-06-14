const { db } = require('../utils/db');

exports.select = async (page = 1) => {
  const limit = Number(process.env.PAGE_LIMIT || 100);
  const offset = Number(page - 1) * limit;
  const row = await db('SELECT * FROM posts LIMIT ? OFFSET ?', [limit, offset]);
  return row;
};

exports.selectById = async (id) => {
  const [row] = await db('SELECT * FROM posts WHERE id = ?', [id]);
  return row;
};

exports.insert = async (data) => {
  const row = await db('INSERT INTO posts SET ?', [data]);
  if (row.affectedRows === 0) { return null; }
  return { id: row.insertId, ...data };
};

exports.update = async (id, data) => {
  const row = await db('UPDATE posts SET ? WHERE id = ?', [data, id]);
  if (row.affectedRows === 0) { return null; }
  return { id, ...data };
};

exports.delete = async (id) => {
  const row = await db('DELETE FROM posts WHERE id = ?', [id]);
  if (row.affectedRows === 0) { return null; }
  return { id };
};
