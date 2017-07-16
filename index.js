const yo = require('yo-yo')
var addBtn = document.getElementById('add-todo')
var todoInput = document.getElementById('input-todo')
var container = document.getElementById('list')

class TodoList {
  constructor() {
    this.items = []
  }
  formatItem(str) {
    return {
      key: String(Date.now()), 
      content: str
    }
  }
  addTodo() {
    this.items.push(this.formatItem(getInput(todoInput)))
    yo.update(container, this.update())
  }
  maybeRemove (el) {
    let elementKey = el.getAttribute('data-id')
    if (el.hasAttribute('data-strike')) {
      el.parentElement.removeChild(el)
      this.items = this.items.filter((item)  => item.key !== elementKey)
    } else {
      el.setAttribute('data-strike', true)
    }
  }
  strikeAndRemove (e) {
    var targ = e.target
    this.maybeRemove(targ)
  }
  update() {
    return yo`
      <div class="items-list">
        <ul>
          ${this.items.map(item => yo`<li onclick=${(e) => this.strikeAndRemove(e)} data-id=${item.key}>${item.content}</li>`)}
        </ul>
      </div>`
  }
}

function getInput (el) {
  var val = el.value
  el.value = ''
  return val
}


function toggleStrikeThrough(el) {
  if (el.hasAttribute('data-strike')) {
    el.removeAttribute('data-strike')
  } else {
    el.setAttribute('data-strike', true)
  }
  return el
}

var todoList = new TodoList()
addBtn.addEventListener('click', (e) => { todoList.addTodo() })
document.addEventListener('DOMContentReady', todoList.update)




