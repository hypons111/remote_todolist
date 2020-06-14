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
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done')
})


//  app.engine('handlebars', expHbs.defaultLayout: 'main')
//  app.set(view.engine, 'handlebars')





app.get('/', (req, res) => {
  res.send('Its working.')
})

app.listen(port, () => {
  console.log(`Its listening to http://localhost:${port}`)
})