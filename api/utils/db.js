const mysql = require('mysql2');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || '',
  user: process.env.MYSQL_USER || '',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DB || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

exports.db = (sql = '', object = '') => connection
  .promise()
  .query(sql, object)
  .then(([rows]) => rows || null)
  .catch((error) => {
    throw error;
  });
