// 載入 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 載入 todo model
const Todo = require('../../models/todo')

//  首頁
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    //  asc 順序  //  desc 反序
    .sort({ _id: 'asc' })
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

// 匯出路由器
module.exports = router