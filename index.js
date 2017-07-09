var addBtn = document.getElementById('add-todo')
var todoInput = document.getElementById('input-todo')
addBtn.addEventListener('click', addTodo)

class TodoList {
  constructor() {
    this.items = []
  }
  addTodo() {
    formatItem(getInput(todoInput))
    renderItem()

  }
  formatItem(str) {
    return {
      id: this.items.length,
      item: str
    }
  }

}

function getInput (el) {
  var val = el.value
  el.value = ''
  return val
}

