// 載入 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const escStrReq = require('escape-string-regexp')
// 載入 users.js
const users = require('../../users.js')


//  login 頁
router.get('/login', (req, res) => {
  res.render('login')

})


//  logining
router.post('/', (req, res) => {
  const { email, password } = req.body
  modifiedPassword = escStrReq(password)
  const check = []

  users.forEach(user => {
    if (user.email.match(email) && user.password.match(modifiedPassword)) {
      check.push(user.firstName)
    }
  })
  const firstName = check[0]
  res.render('logined', { firstName })
})


//  fuck yeah
router.get('/logined', (req, res) => {
  res.render('logined')
})


// 匯出路由器
module.exports = router






