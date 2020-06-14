const port = 3000
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expHbs = require('express-handlebars')
const bodPar = require('body-parser')
const Todo = require('./models/todo')


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


//  設定 body-parser
app.use(bodPar.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name

  //  有兩個方法可以在資料庫新增資料


  // 方法一：
  // 在伺服器端由 Todo 產生一個實例
  // 然後將實例存入資料庫
  /*
    const todo = New Todo({ name })
    return todo.save()
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  */

  //  方法二：
  //  直接用 mongoose create 資料
  //  呼叫 Todo 物件直接新增資料
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`Its listening to http://localhost:${port}`)
})