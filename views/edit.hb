{{!-- action === 將資料送到 /todos --}}

<form action="/todos/{{todo._id}}/edit" method="POST">
  {{!-- name 是 HTTP 傳輸時的資料名稱。這些資料會被放在 HTTP 的 request body 裡，進到 Express.js 以後打包成 req.body 物件，就能在後續流程中使用 --}}
  <input type="text" placeholder="name" name="name" value="{{todo.name}}"></input>
  <button type="submit">Save</button>
  <a href="/"></a>
</form>