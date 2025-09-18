const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');

input.addEventListener('keydown', (e) => {

    // 한글/일본어 등 IME 조합 중 Enter는 무시
  if (e.isComposing || e.keyCode === 229) return;

    if (e.key === 'Enter') {
        const text = input.value.trim();
        if(!text) return;
        addTodo(text);
        input.value = '';
    }
});

function createTodoItem(text, buttonText, buttonClass, onButtonClick) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.className = 'todo-item__text';
    span.textContent = text;

    const button = document.createElement('button');
    button.className = `btn ${buttonClass}`;
    button.textContent = buttonText;
    button.addEventListener('click', onButtonClick);

    li.append(span, button);
    return li;
}

function addTodo(text) {
    const li = createTodoItem(text, '완료', 'btn-complete', () => moveToDone(li, text));
    todoList.prepend(li);
}

function moveToDone(originLi, text) {
    originLi.remove();
    const li = createTodoItem(text, '삭제', 'btn-delete', () => li.remove());
    doneList.prepend(li);
}