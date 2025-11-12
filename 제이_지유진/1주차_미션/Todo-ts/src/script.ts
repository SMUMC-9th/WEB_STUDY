type Todo = { id: number; text: string };

let nextId = 1;
let pendingTodos: Todo[] = [];
let doneTodos: Todo[] = [];

const input = document.querySelector<HTMLInputElement>("#todo-input")!;
const addButton = document.querySelector<HTMLButtonElement>("#add-button")!;
const pendingList = document.querySelector<HTMLUListElement>("#pending-list")!;
const doneList = document.querySelector<HTMLUListElement>("#done-list")!;

addButton.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    addTodo(input.value.trim());
    input.value = "";
  }
});

input.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    addTodo(input.value.trim());
    input.value = "";
  }
});

function addTodo(text: string): void {
  const newTodo: Todo = { id: nextId++, text };
  pendingTodos.push(newTodo);
  render();
}

function completeTodo(id: number): void {
  const index = pendingTodos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    const [todo] = pendingTodos.splice(index, 1);
    if (todo !== undefined) {
      doneTodos.push(todo);
    }
    render();
  }
}

function deleteTodo(id: number): void {
  doneTodos = doneTodos.filter((todo) => todo.id !== id);
  render();
}

function render(): void {
  pendingList.innerHTML = "";
  pendingTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = todo.text;

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "완료";
    completeBtn.className = "todo-action complete";
    completeBtn.addEventListener("click", () => completeTodo(todo.id));

    li.appendChild(span);
    li.appendChild(completeBtn);
    pendingList.appendChild(li);
  });

  doneList.innerHTML = "";
  doneTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.className = "todo-action delete";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    doneList.appendChild(li);
  });
}
