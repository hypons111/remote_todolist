<a href="./todos/new">Create</a>
<ul>
  {{#each todos}}
  <li>
    {{this.name}}
    <a href="./todos/{{ this._id }}">detail</a>
    <a href="./todos/{{ this._id }}/edit">edit</a>
  </li>
  {{/each}}
</ul>