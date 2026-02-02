// index.js
const express = require('express')
const cors = require('cors');
const app = express()
const db = require('./db')

let salesData = []

app.use(cors());

function refreshData() {

  db.request().query('SELECT * FROM sales_data', (err, result) => {
    if (err) {
      console.log(`Error executing query 2: ${err}`)
    } else {
      salesData = result.recordset
      console.log(`sales data refreshed at 2 ${new Date()}`)
      console.log(salesData)
    }
  })
}

const poolConnect = db.connect()

poolConnect.then(() => {
  console.log('Connected to the database')
  refreshData();

}).catch((err) => {
  console.log(`Error connecting to the database: ${err}`)
})

app.get('/api/sales-data', (req, res) => {
  res.json(salesData)
})

app.listen(3500, () => {
  console.log('Server listening on port 3500')
})
