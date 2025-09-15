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

function addTodo(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.className = 'todo-item__text';
    span.textContent = text;

    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn btn-complete';
    completeBtn.textContent = '완료';
    completeBtn.addEventListener('click', () => moveToDone(li, text));

    li.append(span, completeBtn);
    todoList.prepend(li);
}

function moveToDone(originLi, text) {
    originLi.remove();

    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.className = 'todo-item__text';
    span.textContent = text;
  
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-delete';
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => li.remove());
  
    li.append(span, deleteBtn);
    doneList.prepend(li);
}