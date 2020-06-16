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
app.engine('hbs', expHbs({ defaultLayout: 'main', extname: '.hbs' }))
//  啟用 handlebars
app.set('view engine', 'hbs')


//  設定 body-parser
app.use(bodPar.urlencoded({ extended: true }))


//  首頁
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    //  asc 順序  //  desc 反序
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})


//  新增頁
app.get('/todos/new', (req, res) => {
  return res.render('new')
})


//  詳細頁
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  //  以 id 去尋找
  return Todo.findById(id)
    //  「撈資料以後想用 res.render()，就要先用 .lean()」
    .lean()
    //  拿到資料後會被存在 todo 變數裡，傳給樣板引擎
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})


//  將新增的資料送往資料庫
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


//  修改頁
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  //  以 id 去尋找
  return Todo.findById(id)
    //  「撈資料以後想用 res.render()，就要先用 .lean()」
    .lean()
    //  拿到資料後會被存在 todo 變數裡，傳給樣板引擎
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})


//  將修改後的資料送往資料庫
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  //  解構賦值 (destructuring assignment)
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})


//  刪除頁
app.post('/todos/:id/delete', (req, res) => {
  //  取得網址上的識別碼，用來查詢使用者想刪除的 To-do
  const id = req.params.id

  //  查詢資料，資料庫查詢成功以後，會把資料放進 todo
  return Todo.findById(id)
    //  「撈資料以後想用 res.render()，就要先用 .lean()」
    //  用 todo.remove() 刪除這筆資料
    .then((todo) => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Its listening to http://localhost:${port}`)
})