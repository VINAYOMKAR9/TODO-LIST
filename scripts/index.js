let addTodoButton = document.getElementById("addBtn");
let tableBody = document.getElementById("todoTableBody");
let inputTitle = document.getElementById("todoName");
let prioritySelect = document.getElementById("priority");

addTodoButton.addEventListener('click', function () {
    let todos = JSON.parse(localStorage.getItem('todos')) || []
    // todos.id='addBtn';
    if (inputTitle.value == '') {
        alert('Todo cannot be empty!');
    }
    else {
        let singletodo = {
            title: inputTitle.value,
            priority: prioritySelect.value,
            status: 'Pending🔃'
        };
        todos.push(singletodo)
        localStorage.setItem('todos', JSON.stringify(todos))
        // alert('Todo added Succsfully!')
        displayTodo(todos)
    }
});

function displayTodo(arr) {
    let todos = JSON.parse(localStorage.getItem('todos')) || []

    tableBody.innerHTML = '';
    arr.map((el, i) => {
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let status = document.createElement('button');
        status.className = 'toggle';
        status.textContent = el.status;
        status.addEventListener('click', function () {
            if (el.status == 'Pending🔃') {
                el.status = 'Completed✅'
            }
            else {
                el.status = 'Pending🔃'
            }
            localStorage.setItem('todos', JSON.stringify(arr));
            displayTodo(arr);
        
        })
        let archivebtn = document.createElement('button');
        archivebtn.textContent = 'Archive'
        archivebtn.class = 'archiveBtn'
        archivebtn.addEventListener('click', function () {
            let filteredData = arr.filter((ele, index) => {
                return index != i;

            });
            console.log(filteredData);
            let archive = JSON.parse(localStorage.getItem('archive')) || [];
            archive.push(el);
            localStorage.setItem('archive', JSON.stringify(archive))
            localStorage.setItem('todos', JSON.stringify(filteredData));
            displayTodo(filteredData);
        })

        td1.innerText = el.title;
        td2.innerText = el.priority;
        td3.append(status);
        if (el.priority == 'medium') {
            td2.style.backgroundColor = 'rgb(255,255,0)'
        }
        else if (el.priority == 'high') {
            td2.style.backgroundColor = 'rgb(255,0,0)'
        }
        td4.append(archivebtn)

        let tr = document.createElement('tr')
        tr.append(td1, td2, td3, td4);
        tableBody.append(tr);
    })
}
let todos = JSON.parse(localStorage.getItem('todos')) || [];
displayTodo(todos)