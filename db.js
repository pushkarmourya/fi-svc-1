const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'sql6.freesqldatabase.com',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_USERNAME
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err)
    return
  }
  console.log('Connected to MySQL database')
})

connection.on('error', (err) => {
  console.error('Database error:', err)
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Reconnecting to database...')
    connection.connect()
  } else {
    throw err
  }
})

module.exports = connection