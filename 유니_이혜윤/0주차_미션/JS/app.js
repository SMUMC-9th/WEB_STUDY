// DOM 요소
const $form = document.getElementById("todo-form");
const $input = document.getElementById("todo-input");
const $todo = document.getElementById("todo-list");
const $done = document.getElementById("done-list");
const trim = (s) => (s ?? "").trim();

// Todo 생성
function makeItem(text) {
  const li = document.createElement("li");
  li.className = "item";

  const span = document.createElement("span");
  span.className = "text";
  span.textContent = text;

  const doneBtn = document.createElement("button");
  doneBtn.className = "btn ok";
  doneBtn.textContent = "완료";

  const delBtn = document.createElement("button");
  delBtn.className = "btn del";
  delBtn.textContent = "삭제";

  li.append(span, doneBtn, delBtn);
  return li;
}

// Todo 추가
function add() {
  const v = trim($input.value);
  if (!v) return;
  $todo.appendChild(makeItem(v));
  $input.value = "";
}

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  add();
});

document.addEventListener("click", (e) => {
  const li = e.target.closest(".item");
  if (!li) return;

  if (e.target.matches(".btn.del")) {
    li.remove();
  }

  if (e.target.matches(".btn.ok")) {
    if (li.parentElement === $todo) {
      li.classList.add("done");
      e.target.textContent = "되돌리기";
      $done.appendChild(li);
    } else {
      li.classList.remove("done");
      e.target.textContent = "완료";
      $todo.appendChild(li);
    }
  }
});
