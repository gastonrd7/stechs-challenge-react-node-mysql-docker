import mysql from 'mysql';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: Number.parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
});


export const query = (sql: string, values?: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(sql, values, (err, results) => {
        connection.release(); // Liberar la conexión después de usarla
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  });
};