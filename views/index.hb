<a href="./todos/new">Create</a>
<ul>
  {{#each todos}}
  <li>
    {{this.name}}
    <a href="./todos/{{ this._id }}">detail</a>
  </li>
  {{/each}}
</ul>