const { db } = require('../utils/db');

exports.selectById = async (id) => {
  const [row] = await db('SELECT * FROM users WHERE id = ?', [id]);
  return row;
};

exports.selectByEmail = async (email) => {
  const [row] = await db('SELECT * FROM users WHERE email = ?', [email]);
  return row;
};

exports.insert = async (data) => {
  const row = await db('INSERT INTO users SET ?', [data]);
  if (row.affectedRows === 0) { return null; }
  return { id: row.insertId, ...data };
};

exports.update = async (id, data) => {
  const row = await db('UPDATE users SET ? WHERE id = ?', [data, id]);
  if (row.affectedRows === 0) { return null; }
  return { id, ...data };
};

exports.delete = async (id) => {
  const row = await db('DELETE FROM users WHERE id = ?', [id]);
  if (row.affectedRows === 0) { return null; }
  return { id };
};
