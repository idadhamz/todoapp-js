
const getTodos = function(){
    const DataTodos = localStorage.getItem('todos')
    const todos = (DataTodos !== null)
        ? JSON.parse(DataTodos)
        : []
    
    return todos;
}

const renderTodos = function(todos, filter){
    console.log(todos)

    const filterTodos = todos.filter(function(todo){
        const searchText = todo.text.toLocaleLowerCase().includes(filter.searchText.toLocaleLowerCase())
        console.log(searchText)
        const hideCompleted = !filter.hideCompleted || todo.jenis != "3"
        
        return searchText && hideCompleted
    })

    const incompletedTodos = filterTodos.filter(function(todo){
        return todo.jenis != "3"
    })

    if(filterTodos.length != 0){
        for(const todo of filterTodos){
            if(todo.jenis == "1"){
                const todo_belum = todos.filter(todo => todo.jenis == "1")
                if(todo_belum.length != 0){
                    document.querySelector('#table_belum #tbody_belum').innerHTML = ''
                    todo_belum.forEach(todo => {
                        console.log(todo)
                        document.querySelector('#table_belum #tbody_belum').appendChild(generateTodos(todo))
                    });
                } else {
                    document.querySelector('#table_belum #tbody_belum').innerHTML = ''
                    document.querySelector('#table_belum #tbody_belum').appendChild(generateNull())
                }
            }else if(todo.jenis == "2"){
                const todo_sedang = todos.filter(todo => todo.jenis == "2")
                // console.log(todo_sedang)
                if(todo_sedang.length != 0){
                    document.querySelector('#table_sedang #tbody_sedang').innerHTML = ''
                    todo_sedang.forEach(todo => {
                        console.log(todo)
                        document.querySelector('#table_sedang #tbody_sedang').appendChild(generateTodos(todo))
                    });
                }else {
                    document.querySelector('#table_sedang #tbody_sedang').innerHTML = ''
                    document.querySelector('#table_sedang #tbody_sedang').appendChild(generateNull())
                }
            }else if(todo.jenis == "3"){
                const todo_sudah = todos.filter(todo => todo.jenis == "3")
                // console.log(todo_sudah)
                if(todo_sudah.length != 0){
                    document.querySelector('#table_sudah #tbody_sudah').innerHTML = ''
                    todo_sudah.forEach(todo => {
                        console.log(todo)
                        document.querySelector('#table_sudah #tbody_sudah').appendChild(generateTodos(todo))
                    });
                }else {
                    document.querySelector('#table_sudah #tbody_sudah').innerHTML = ''
                    document.querySelector('#table_sudah #tbody_sudah').appendChild(generateNull())
                }
            }
        }

        document.querySelector('#info').innerHTML = ''
        document.querySelector('#info').appendChild(infoTodo(incompletedTodos))
        document.querySelector('#table_all #tbody_all').innerHTML = ''
        filterTodos.forEach(todo => {
            console.log(todo)
            document.querySelector('#table_all #tbody_all').appendChild(generateTodos(todo))
        });

    }else {
        document.querySelector('#table_belum #tbody_belum').innerHTML = ''
        document.querySelector('#table_belum #tbody_belum').appendChild(generateNull())
        document.querySelector('#table_sedang #tbody_sedang').innerHTML = ''
        document.querySelector('#table_sedang #tbody_sedang').appendChild(generateNull())
        document.querySelector('#table_sudah #tbody_sudah').innerHTML = ''
        document.querySelector('#table_sudah #tbody_sudah').appendChild(generateNull())
        document.querySelector('#table_all #tbody_all').innerHTML = ''
        document.querySelector('#table_all #tbody_all').appendChild(generateNull())
    }
}

const saveTodos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
}

const generateTodos = function(todo){
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    console.log(todo.text)
    cell.textContent = todo.text
    // if(todo.text === null){
    //     cell.textContent = 'Data tidak ada'
    // }else {
    //     cell.textContent = todo.text
    // }
    row.appendChild(cell)

    return row;
}

const generateNull = function(){
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    cell.textContent = 'Tidak ada todo'
    // cell.className = 'text-center'
    row.appendChild(cell)

    return row;
}

const infoTodo = function(incompletedTodos){
    const info = document.createElement('p')
    info.textContent = `Sisa todo belum selesai : ${incompletedTodos.length} Todo`

    return info
}