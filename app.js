const port = 3000
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expHbs = require('express-handlebars')
const bodPar = require('body-parser')
const metOve = require('method-override')
const routes = require('./routes')
const Todo = require('./models/todo')





//  使用 mongoose.connect 連線到指定的資料庫
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

//  連線後把連線狀態暫存下來才能繼續使用
const db = mongoose.connection

db.on('error', () => console.log('mongodb error'))

db.once('open', () => console.log('mongodb connected'))

//  設定 handlebars，改變副檔名
app.engine('hbs', expHbs({ defaultLayout: 'main', extname: '.hbs' }))

//  使用 handlebars
app.set('view engine', 'hbs')

//  設定 body-parser
app.use(bodPar.urlencoded({ extended: true }))

//  設定 method-override
app.use(metOve('_method'))

//  使用路由器
app.use(routes)





//  連接伺服器
app.listen(port, () => console.log(`Its listening to http://localhost:${port}`))