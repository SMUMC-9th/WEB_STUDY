const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');

todoInput.addEventListener('keydown', function(event) {
    if(event.key === 'Enter' && todoInput.value.trim()!== ''){
        event.preventDefault();

        addTask(todoInput.value);
        todoInput.value = '';
    }
});

function addTask(text) {
    const listItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = text;

    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';

    completeButton.addEventListener('click', function() {
        doneList.appendChild(listItem);
        completeButton.remove();

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.className = 'delete-btn';

        deleteButton.addEventListener('click', function() {
            listItem.remove();
        });
        listItem.appendChild(deleteButton);
    });

    listItem.appendChild(taskText);
    listItem.appendChild(completeButton);

    todoList.appendChild(listItem);
}