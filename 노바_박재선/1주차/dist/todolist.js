"use strict";
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');
const addButton = document.querySelector('.Editor > button');
if (!todoInput || !todoInput || !doneList || !addButton) {
    throw new Error("필수 DOM요소를 찾을수 없습니다.");
}
todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && todoInput.value.trim() !== '') {
        event.preventDefault();
        addTask(todoInput.value.trim());
        todoInput.value = '';
    }
});
addButton.addEventListener('click', () => {
    if (todoInput.value.trim() !== '') {
        addTask(todoInput.value.trim());
        todoInput.value = '';
    }
});
function addTask(text) {
    const listItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = text;
    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';
    completeButton.addEventListener('click', function () {
        doneList.appendChild(listItem);
        completeButton.remove();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', () => {
            listItem.remove();
        });
        listItem.appendChild(deleteButton);
    });
    listItem.appendChild(taskText);
    listItem.appendChild(completeButton);
    todoList.appendChild(listItem);
}
