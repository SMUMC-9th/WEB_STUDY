// Todo_v1.tsx (컴포넌트화 X)

import {type FormEvent, useState} from "react";
import type {TTodo} from "../types/todo.ts";

const Todo_v1 = () => {

  // 할 일 목록
  const [todos, setTodos] = useState<TTodo[]>([]); // 제네릭을 사용해서 상태 관리 (배열 안 요소는 TTodo 객체만 가능)

  // 완료한 일 목록
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

  // input
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) : void => {
    e.preventDefault();
    const text = input.trim(); // 앞뒤 공백 제거
    if(text){
      const newTodo : TTodo = {id : Date.now(), text};
      setTodos((prevTodos) => [...prevTodos, newTodo]); // 이전 값 유지 + 새로운 값 추가
      setInput(""); // 입력되면 input 값 초기화되게
    }
  }

  const completeTodos = ((todo: TTodo) : void  => {
    // 1. todos에서 완료된 todo 제거
    setTodos((prevTodos) : TTodo[] =>
      prevTodos.filter(
      (t) => t.id !== todo.id)); // 동일하지 않은 아이디만 남게(선택한 todo 제외)

    // 2. doneTodos에 완료된 todo 추가
    setDoneTodos((prevDoneTodos : TTodo[]) =>
      [...prevDoneTodos, todo]); // 기존 배열에 새 todo 붙이기
  });

  const deleteTodo = ((todo : TTodo) : void => {
    setDoneTodos((prevDoneTodo)  =>
      prevDoneTodo.filter((t: TTodo) => t.id !== todo.id)
    );
  })

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">PLAN YOUR DAY</h1>
      <form
        onSubmit={handleSubmit}
        id="todo-form"
        className="todo-container__form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)} // 값이 변경될 때마다 인지 ??
          id="todo-input"
          className="todo-container__input"
          type="text"
          placeholder="Add a new test"
          autoComplete="off"
          required
        />
        <button type="submit" className="todo-container__button">+</button>
      </form>
      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">To do</h2>
          <ul id="todo-list" className="render-container__list">
            {todos.map((todo)  => ( // map()을 사용해 렌더링
              <li key = {todo.id} className='render-container__item'>
                <span className='render-container__item-text'>{todo.text}</span>
                <button
                  onClick={() => completeTodos(todo)}
                  className='render-container__item-button'>O</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="render-container__section">
          <h2 className="render-container__title">Completed</h2>
          <ul id="done-list" className="render-container__list">
            {doneTodos.map((todo)  => (
              <li key = {todo.id} className='render-container__item'>
                <span className='render-container__item-text'>{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo)}
                  className='render-container__item-button'>X</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

};

export default Todo_v1;