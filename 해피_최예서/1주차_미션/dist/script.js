"use strict";
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
let todos = [];
let doneTasks = [];
const renderTasks = () => {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((task) => {
        const li = createTodoElement(task, true);
        doneList.appendChild(li);
    });
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    todoInput.value = "";
    renderTasks();
};
const completeTask = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};
const createTodoElement = (todo, isDone) => {
    const li = document.createElement("li");
    li.classList.add("render-container__item");
    li.textContent = todo.text;
    const button = document.createElement("button");
    button.classList.add("render-container__item-button");
    if (isDone) {
        button.textContent = "X";
    }
    else {
        button.textContent = "O";
    }
    button.addEventListener("click", () => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTask(todo);
        }
    });
    li.appendChild(button);
    return li;
};
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = getTodoText();
    if (text)
        addTodo(text);
});
renderTasks();
