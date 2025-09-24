"use strict";
var _a, _b;
function byId(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`#${id} element not found`);
    return el;
}
function save(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}
function load(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    }
    catch (_a) {
        return null;
    }
}
const todoInput = byId("todo-input");
const todoForm = byId("todo-form");
const todoList = byId("todo-list");
const doneList = byId("done-list");
let todos = (_a = load("todos")) !== null && _a !== void 0 ? _a : [];
let doneTasks = (_b = load("doneTasks")) !== null && _b !== void 0 ? _b : [];
renderTasks();
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text)
        return;
    todos.unshift({ id: Date.now(), text });
    todoInput.value = "";
    persist();
    renderTasks();
});
function renderTasks() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    if (todos.length === 0) {
        todoList.appendChild(empty("할 일이 비어있어요"));
    }
    if (doneTasks.length === 0) {
        doneList.appendChild(empty("완료한 항목이 없어요"));
    }
    todos.forEach((t) => todoList.appendChild(row(t, false)));
    doneTasks.forEach((t) => doneList.appendChild(row(t, true)));
}
function row(todo, isDone) {
    const li = document.createElement("li");
    li.className = "render-container__item" + (isDone ? " is-done" : "");
    const span = document.createElement("span");
    span.className = "render-container__item-text";
    span.textContent = todo.text;
    const btn = document.createElement("button");
    if (isDone) {
        btn.className = "btn btn--danger";
        btn.textContent = "삭제";
        btn.addEventListener("click", () => {
            doneTasks = doneTasks.filter((t) => t.id !== todo.id);
            persist();
            renderTasks();
        });
    }
    else {
        btn.className = "btn btn--accent";
        btn.textContent = "완료";
        btn.addEventListener("click", () => {
            todos = todos.filter((t) => t.id !== todo.id);
            doneTasks = [Object.assign({}, todo), ...doneTasks];
            persist();
            renderTasks();
        });
    }
    li.appendChild(span);
    li.appendChild(btn);
    return li;
}
function empty(text) {
    const div = document.createElement("div");
    div.className = "empty";
    div.textContent = text;
    return div;
}
function persist() {
    save("todos", todos);
    save("doneTasks", doneTasks);
}
