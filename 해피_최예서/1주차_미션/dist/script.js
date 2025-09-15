"use strict";
const todoInput = document.getElementById('todoInput');
const main__will = document.querySelector('.main__will');
const main__did = document.querySelector('.main__did');
function addMainwill(value) {
    const todo = document.createElement('div');
    const completeBtn = document.createElement('button');
    todo.textContent = value;
    completeBtn.textContent = '[O]';
    todo.appendChild(completeBtn);
    main__will.appendChild(todo);
    completeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        main__did.appendChild(todo);
        completeBtn.textContent = '[X]';
        const deleteBtn = completeBtn;
        deleteBtn.addEventListener('click', deleteTodo);
    });
}
function deleteTodo(event) {
    const target = event.target;
    const todo = target.parentElement;
    todo.remove();
}
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const value = todoInput.value.trim();
        if (!value)
            return;
        else {
            addMainwill(value);
            todoInput.value = '';
        }
    }
});
