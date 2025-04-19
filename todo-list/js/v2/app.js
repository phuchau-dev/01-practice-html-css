const form = document.querySelector('form');
const input = document.querySelector('input');
const listtodo = document.querySelector('.list-todo');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const newTodo = input.value.trim();
    const isValid = /^[a-zA-Z0-9\s]+$/.test(newTodo);
    if (newTodo === '') {
        alert('Không được để trống!');
    } else if (!isValid) {
        alert('Chỉ nhập chữ cái, số, không được gõ bậy!');
    } else if (newTodo.length > 30) {
        alert('Công việc dài quá, nhập ngắn gọn thôi!');
    } else {
        const li = document.createElement('li');
        li.innerText = newTodo;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Xóa'
        deleteBtn.addEventListener('click', function () {
            li.remove();
            saveToLocalStorage();
        });
        li.appendChild(deleteBtn);
        listtodo.appendChild(li);
        input.value = '';
        saveToLocalStorage();
    }
});
function saveToLocalStorage() {
    const todo = [];
    listtodo.querySelectorAll('li').forEach(function (li) {
        const text = li.firstChild.textContent.trim();
        todo.push(text);
    });
    localStorage.setItem('todo', JSON.stringify(todo));
}
function loadFromLocalStorage() {
    const todos = JSON.parse(localStorage.getItem('todo')) || [];
    todos.forEach(function (todo) {
        const li = document.createElement('li');
        li.innerText = todo;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Xóa';
        deleteBtn.addEventListener('click', function () {
            li.remove();
            saveToLocalStorage();
        });
        li.appendChild(deleteBtn);
        listtodo.appendChild(li);
    })
}
loadFromLocalStorage();