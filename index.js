const yo = require('yo-yo')
var addBtn = document.getElementById('add-todo')
var todoInput = document.getElementById('input-todo')
var container = document.getElementById('list')
var todoList = new TodoList()
addBtn.addEventListener('click', todoList.addTodo)
document.addEventListener('DOMContentReady', todoList.update)

class TodoList {
  constructor() {
    this.items = []
    this.addTodo = this.addTodo.bind(this)
    this.formatItem = this.formatItem.bind(this)
    this.update = this.update.bind(this)
  }
  addTodo() {
    this.items.push(this.formatItem(getInput(todoInput)))
    yo.update(container, this.update())
  }
  formatItem(str) {
    return {
      id: this.items.length,
      content: str
    }
  }
  update() {
   return yo`
     <div class="items-list">
      <ul>
        ${this.items.map(item => yo`<li data-id=${item.id}>${item.content}</li>`)}
       </ul>
     </div>`
  }
}

function getInput (el) {
  var val = el.value
  el.value = ''
  return val
}

