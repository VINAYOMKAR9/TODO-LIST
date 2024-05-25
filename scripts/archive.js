let tableBody = document.getElementById("todoTableBody");
let prioritySelect = document.getElementById("prioritySelect");
let statusSelect = document.getElementById("statusSelect");

function displayTodo(arr) {
    tableBody.innerHTML = '';
    arr.map((el, i) => {
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4=document.createElement('td');
        let td5=document.createElement('td');
        let restore = document.createElement('button');
        restore.textContent = 'Restore'
        restore.class='restoreBtn';
        restore.addEventListener('click',()=>{
        let archive = JSON.parse(localStorage.getItem('archive'));
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        let filteredData = archive.filter((ele,index)=>{
            return i!=index;
        })
        todos.push(el);
        localStorage.setItem('todos',JSON.stringify(todos));
        localStorage.setItem('archive',JSON.stringify(filteredData));
        displayTodo(filteredData);            
        });


        let deletebtn = document.createElement('button');
        deletebtn.textContent = 'delete';
        deletebtn.class='deleteBtn';
        deletebtn.addEventListener('click',()=>{
        let archive = JSON.parse(localStorage.getItem('archive'));
        let filteredData = archive.filter((ele,index)=>{
            return i != index;
        });
        localStorage.setItem('archive',JSON.stringify(filteredData));
        displayTodo(filteredData);            
    });

        td1.innerText = el.title;
        td2.innerText = el.priority;
        td3.innerText = el.status;
        if (el.priority == 'medium') {
            td2.style.backgroundColor = 'rgb(255,255,0)'
        }
        else if (el.priority == 'high') {
            td2.style.backgroundColor = 'rgb(255,0,0)'
        }
        td4.append(restore);
        td5.append(deletebtn);
        let tr = document.createElement('tr')
        tr.append(td1, td2, td3,td4,td5);
        tableBody.append(tr);
    })
}
let archive = JSON.parse(localStorage.getItem('archive'));
displayTodo(archive);

statusSelect.addEventListener('change',function(){
    let archive = JSON.parse(localStorage.getItem('archive'));
    let filteredData = archive.filter((el,i)=>{
        if(el.status == statusSelect.value){
            return el
        }
    })
    displayTodo(filteredData)
})


prioritySelect.addEventListener('change',function(){
    let archive = JSON.parse(localStorage.getItem('archive'));
    let filteredData = archive.filter((el,i)=>{
        if(el.priority == prioritySelect.value){
            return el
        }
    })
    displayTodo(filteredData)
})