const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");

// 상태
let todos = load("todos") ?? [];
let doneTasks = load("doneTasks") ?? [];

//최초 그리기
renderTasks();

//입력
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  // 최신 항목이 제일 위에
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

  // 리스트 렌더
  todos.forEach((t) => todoList.appendChild(row(t, false)));
  doneTasks.forEach((t) => doneList.appendChild(row(t, true)));
}

// 아이템 하나씩 생성
function row(todo, isDone) {
  const li = document.createElement("li");
  li.className = "render-container__item" + (isDone ? " is-done" : "");

  // 텍스트
  const span = document.createElement("span");
  span.className = "render-container__item-text";
  span.textContent = todo.text;

  // 버튼
  const btn = document.createElement("button");
  if (isDone) {
    btn.className = "btn btn--danger";
    btn.textContent = "삭제";
    btn.addEventListener("click", () => {
      doneTasks = doneTasks.filter((t) => t.id !== todo.id);
      persist();
      renderTasks();
    });
  } else {
    btn.className = "btn btn--accent";
    btn.textContent = "완료";
    btn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      doneTasks = [{ ...todo }, ...doneTasks];
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
function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}
function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}
