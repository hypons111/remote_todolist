const port = 3000
const express = require('express')
const app = express()
const expHbs = require('express-handlebars')
const mongoose = require('mongoose')

app.get('/', (req, res) => {
  res.send('Its working.')
})

app.listen(port, () => {
  console.log(`Its listening to http://localhost:${port}`)
})