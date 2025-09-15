const todoInput = document.getElementById('todoInput')! as HTMLInputElement;
const main__will = document.querySelector('.main__will') as HTMLDivElement;
const main__did= document.querySelector('.main__did') as HTMLDivElement;

// 해야 할 일에 추가 함수
function addMainwill(value : string) : void {
  const todo:HTMLDivElement = document.createElement('div');
  const completeBtn:HTMLButtonElement = document.createElement('button');
  todo.textContent = value;
  completeBtn.textContent = '[O]';
  todo.appendChild(completeBtn);
  main__will.appendChild(todo);

  // '완료' 버튼 클릭시 삭제하고 Main__did에 추가
  completeBtn.addEventListener('click', function(e : MouseEvent) {
    e.preventDefault();
    main__did.appendChild(todo); // 해낸 일로 옮기기

    // 삭제 로직
    completeBtn.textContent = '[X]';
    const deleteBtn : HTMLButtonElement = completeBtn;
    deleteBtn.addEventListener('click', deleteTodo);
  })
}


// 삭제 함수
function deleteTodo(event : MouseEvent) : void {
  const target = event.target as HTMLElement;
  const todo = target.parentElement as HTMLElement;
  todo.remove();
}

// ---이벤트 등록---
// 이벤트 추가
todoInput.addEventListener('keypress', (e:KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const value : string = todoInput.value.trim();
    if(!value) return; // value가 falsy 값이면 종료
    else {
      addMainwill(value);
      todoInput.value = '';
    }
  }
})

