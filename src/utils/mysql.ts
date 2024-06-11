import mysql from 'serverless-mysql'

export const createConnection = async () => {
  return mysql({
    library: require('mysql2'),
    config: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
    },
  })
}

export const executeQuery = async <T, V>(
  connection: any,
  sql: string,
  data?: V
): Promise<T> => {
  return (await connection.query(sql, data)) as T
}
