<p>{{ todo.name }}</p>
<a href="/todos/{{todo._id}}/edit">Edit</a>
<form action="/todos/{{ todo._id }}/delete" method="POST" style="display: inline;">
  <button type="submit">delete</button>
</form>