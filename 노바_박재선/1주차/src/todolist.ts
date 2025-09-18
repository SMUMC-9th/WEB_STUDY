const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoList = document.getElementById('todo-list') as HTMLInputElement;
const doneList = document.getElementById('done-list') as HTMLInputElement;
const addButton = document.querySelector('.Editor > button') as HTMLInputElement;

if (!todoInput || !todoInput || !doneList || !addButton){
    throw new Error("필수 DOM요소를 찾을수 없습니다.");
}

todoInput.addEventListener('keydown',(event: KeyboardEvent) =>{
    if(event.key === 'Enter' && todoInput.value.trim()!== ''){
        event.preventDefault();

        addTask(todoInput.value.trim());
        todoInput.value = '';
    }
});

addButton.addEventListener('click',() => {
    if(todoInput.value.trim() !== ''){
        addTask(todoInput.value.trim());
        todoInput.value = '';
    }
})

function addTask(text: string): void {
    const listItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = text;

    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';

    const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';

    completeButton.addEventListener('click', function () {
        doneList.appendChild(listItem);
        completeButton.remove();
        listItem.appendChild(deleteButton);
    });
    listItem.appendChild(taskText);
    listItem.appendChild(completeButton);
    todoList.appendChild(listItem);
    deleteButton.addEventListener('click', () => {
        listItem.remove();
        deleteButton.remove();
    });

    
}