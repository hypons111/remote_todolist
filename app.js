const port = 3000
const express = require('express')
const app = express()
const expHbs = require('express-handlebars')
const bodPar = require('body-parser')
const metOve = require('method-override')
const routes = require('./routes')
require('./config/mongoose')


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