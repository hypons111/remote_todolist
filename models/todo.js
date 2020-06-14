//  mongoose 載入進來，才能使用相關方法。
const mongoose = require('mongoose')


//  這裡 Schema 大寫表示你可以用 new Schema() 的方式來建構一個新的 Schema。
const Schema = mongoose.Schema


//  把我們想要的資料結構當成參數傳給 new Schema()
const todoSchema = new Schema({
  name: {

    // 資料型別是字串
    type: String,

    // 這是個必填欄位
    required: true
  }
})


//  然後透過 module.exports 把這個 schema 輸出。
module.exports = mongoose.model('Todo', todoSchema)