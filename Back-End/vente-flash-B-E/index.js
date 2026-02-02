// index.js
const express = require('express')
const cors = require('cors');
const cron = require('node-cron');
const app = express()
const db = require('./db')

let flash = []

app.use(cors());

function refreshData() {
  db.request().query('SELECT * FROM flash WHERE DATEDIFF(MINUTE, date_time, GETDATE()) <= 20', (err, result) => {
    if (err) {
      console.log(`Error executing query 1: ${err}`)
    } else {
      flash = result.recordset
      console.log(`flash data refreshed at 1 ${new Date()}`)
      console.log(flash)
    }
  })

}

const poolConnect = db.connect()

poolConnect.then(() => {
  console.log('Connected to the database')
  refreshData();
  cron.schedule('*/20 * * * *', () => {
    refreshData();
  });
}).catch((err) => {
  console.log(`Error connecting to the database: ${err}`)
})

app.get('/api/flash', (req, res) => {
  res.json(flash)
})

app.listen(4000, () => {
  console.log('Server listening on port 4000')
})
