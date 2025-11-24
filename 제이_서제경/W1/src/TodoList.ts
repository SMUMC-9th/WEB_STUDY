function byId<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} element not found`);
  return el as T;
}

function save<T>(key: string, val: T): void {
  localStorage.setItem(key, JSON.stringify(val));
}

function load<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

interface Todo {
  id: number;
  text: string;
}

const todoInput = byId<HTMLInputElement>("todo-input");
const todoForm = byId<HTMLFormElement>("todo-form");
const todoList = byId<HTMLUListElement>("todo-list");
const doneList = byId<HTMLUListElement>("done-list");

let todos: Todo[] = load<Todo[]>("todos") ?? [];
let doneTasks: Todo[] = load<Todo[]>("doneTasks") ?? [];

renderTasks();

todoForm.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const text = todoInput.value.trim();
  if (!text) return;

  // 최신 항목이 위로
  todos.unshift({ id: Date.now(), text });
  todoInput.value = "";
  persist();
  renderTasks();
});

function renderTasks(): void {
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

// 아이템 한 줄 생성
function row(todo: Todo, isDone: boolean): HTMLLIElement {
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

function empty(text: string): HTMLDivElement {
  const div = document.createElement("div");
  div.className = "empty";
  div.textContent = text;
  return div;
}

function persist(): void {
  save("todos", todos);
  save("doneTasks", doneTasks);
}
