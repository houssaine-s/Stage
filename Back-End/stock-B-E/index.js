// index.js
const express = require('express')
const cors = require('cors');
const app = express()
const db = require('./db')

let stock = []


app.use(cors());

function refreshData() {
  db.request().query('SELECT * FROM mstock', (err, result) => {
    if (err) {
      console.log(`Error executing query 3: ${err}`)
    } else {
      stock = result.recordset
      console.log(`data has been retrieved succefully ${new Date()}`)
      //console.log(stock)
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

app.get('/api/stock', (req, res) => {
  res.json(stock)
})



app.listen(5000, () => {
  console.log('Server listening on port 5000')
})
