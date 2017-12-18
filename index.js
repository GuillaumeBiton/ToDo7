import Framework7 from 'framework7'
import Store from 'simple-storejs'

// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.todo7', // App bundle ID
  name: 'ToDo7', // App name
  theme: 'auto', // Automatic theme detection
  data: function () {
    return {
      todos: new Store('todos')
    };
  },
  methods: {
    addTodo: function () {
      // get value from input
      var text = app.messagebar.getValue().replace(/\n/g, '<br>').trim();
      // save it into collection
      if (text.trim().length) {
        console.log(app.data);
        app.data.todos.save({
          title: text,
          completed: false
        });
      }
      // Clear area
      app.messagebar.clear();
      // render
      renderTodoList();
    }
  },
});

// Init message bar
app.messagebar = app.messagebar.create({
  el: $$(document).find('.messagebar'),
  attachments: []
});

// Building todo list
var todoListTemplate = Template7.compile('\
<ul>\
{{#each this}}\
<li data-id="{{id}}">\
<label class="item-checkbox item-content">\
<input type="checkbox" {{#if completed}}checked{{/if}}>\
<i class="icon icon-checkbox"></i>\
<div class="item-inner">\
<div class="item-title {{#if completed}}done{{/if}}">{{title}}</div>\
</div>\
</label>\
</li>\
{{/each}}\
</ul>\
');
function renderTodoList(list) {
  var renderedList = todoListTemplate(list || app.data.todos.data);
  $$('.todo-list').html(renderedList);
}
renderTodoList();

// checked task
$$('.todo-list').on('change', 'input', function () {
  var input = $$(this);
  var id = input.parents('li').attr('data-id') * 1;
  app.data.todos.toggle(id, 'completed');
  renderTodoList();
});

// Add Todo
$$('.todo-add').on('click', app.methods.addTodo);
