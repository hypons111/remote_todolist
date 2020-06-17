const mongoose = require('mongoose')

//  使用 mongoose.connect 連線到指定的資料庫
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

//  連線後把連線狀態暫存下來才能繼續使用
const db = mongoose.connection

//  連線失敗
db.on('error', () => console.log('mongodb error'))

//  連線成功
db.once('open', () => console.log('mongodb connected'))

module.exports = db