const sql = require('mssql')

const dbConfig = {
  server: 'localhost',
  database: 'Vente',
  user: 'root',
  password: 'root',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    encrypt: false,
  }
}


const pool = new sql.ConnectionPool(dbConfig)
const poolConnect = pool.connect()

poolConnect.then(() => {
  console.log('Connected to the database')
}).catch((err) => {
  console.log(`Error connecting to the database: ${err}`)
})

module.exports = pool

  