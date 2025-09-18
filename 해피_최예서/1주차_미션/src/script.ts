// 1. HTML 요소 선택
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

// 2. 할 일이 어떻게 생긴 애인지 type을 정의
// => 객체 구조를 type로 정의
type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// - 할 일 목록을 랜더링 하는 함수 정의
const renderTasks = (): void => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  todos.forEach((todo: Todo): void => {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);
  });

  doneTasks.forEach((task: Todo) => {
    const li = createTodoElement(task, true);
    doneList.appendChild(li);
  });
};

// 3. 할 일 텍스트 입력 처리 함수 (공백 잘라줌)
const getTodoText = (): string => {
  return todoInput.value.trim(); // trim: 문자열 앞 뒤 공백을 제거하는 메서드
};

// 4. 할 일 추가 처리 함수
const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTasks();
};

// 5. 할 일 상태 변경 (완료로 변경)
const completeTask = (todo: Todo) => {
  todos = todos.filter((t): boolean => t.id !== todo.id); // filter로 완료한 할 일을 제거함. (선택한 todo.id(=즉 삭제할 아이템의 id) id가 다른 아이템들만 남기고 toods 배열 갱신)
  doneTasks.push(todo);
  renderTasks();
};

// 6. 완료된 할 일 삭제 함수
const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
  renderTasks();
};

// 7. 할 일 아이템 생성 함수
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
  const li = document.createElement("li");
  li.classList.add("render-container__item");
  li.textContent = todo.text;

  const button = document.createElement("button");
  button.classList.add("render-container__item-button");

  if (isDone) {
    button.textContent = "X";
  } else {
    button.textContent = "O";
  }

  button.addEventListener("click", (): void => {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTask(todo);
    }
  });
  li.appendChild(button);
  return li;
};

//   <ul id="done-list" class="render-container__list"></ul>
//     <li class="render-container__item">
//   <p class="render-container__item-text"></p>
//     <button class="render-container__item-button"></button>
//     </li>

// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener("submit", (e) => {
  e.preventDefault(); // form 기본 새로고침 방지
  const text = getTodoText();
  if (text) addTodo(text);
});

renderTasks();
