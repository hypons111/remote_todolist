// 載入 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todos = require('./modules/todos')
const login = require('./modules/login')

// 準備引入路由模組
router.use('/account', login)
router.use('/', home)
router.use('/todos', todos)

// 匯出路由器
module.exports = router