const port = 3000
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expHbs = require('express-handlebars')
const todo = require('./models/todo')


//  執行了 mongoose.connect 之後會得到一個連線狀態，需要設定一個參數把連線狀態暫存下來，才能繼續使用。
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})


//  設定 handlebars，改變副檔名
app.engine('hb', expHbs({ defaultLayout: 'main', extname: '.hb' }))
//  啟用 handlebars
app.set('view engine', 'hb')


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Its listening to http://localhost:${port}`)
})