const todoInput = document.getElementById('todoInput');
const main__will = document.querySelector('.main__will');
const main__did= document.querySelector('.main__did');

// 해야 할 일에 추가 함수
function addMainwill(value){
  const todo = document.createElement('div');
  const completeBtn = document.createElement('button');
  todo.textContent = value;
  completeBtn.textContent = '[O]';
  todo.appendChild(completeBtn);
  main__will.appendChild(todo);

  // '완료' 버튼 클릭시 삭제하고 Main__did에 추가
  completeBtn.addEventListener('click', function(e){
    e.preventDefault();
    main__did.appendChild(todo); // 해낸 일로 옮기기

    // 삭제 로직
    completeBtn.textContent = '[X]';
    const deleteBtn = completeBtn;
    deleteBtn.addEventListener('click', deleteTodo);
  })
}


// 삭제 함수
function deleteTodo(event){
  const todo = event.target.parentElement;
  todo.remove();
}

// ---이벤트 등록---
// 이벤트 추가
todoInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const value = todoInput.value.trim(); if(!value) return; // value가 falsy 값이면 종료
    else {
      addMainwill(value);
      todoInput.value = '';
    }
  }
})

