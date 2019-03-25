let todos = getTodos();

const filter = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filter)

document.querySelector('#cari_todo').addEventListener('input', function(e){
    filter.searchText = e.target.value
    renderTodos(todos, filter)
})

document.querySelector('#hide-sudah').addEventListener('change', function(e){
    filter.hideCompleted = e.target.checked
    renderTodos(todos, filter)
})

document.querySelector('#new-todo').addEventListener('submit', function(e){
    e.preventDefault()
    console.log(e)
    todos.push({
        text: e.target.elements.todo.value,
        jenis: e.target.elements.pilihan_todo.value
    })
    saveTodos(todos)
    renderTodos(todos, filter)
    e.target.elements.todo.value = ''
})