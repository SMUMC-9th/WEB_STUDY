import { createContext, useContext, useState, type PropsWithChildren, type ReactElement } from "react";
import type { TTodo } from "../types/todo";

interface ITodoContext {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({children}: PropsWithChildren) : ReactElement => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

    const addTodo = (text: string): void => {
        const newTodo: TTodo = { id: Date.now(), text };
        setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
    }

    const completeTodo = (todo: TTodo): void => {
        setTodos(prevTodos => prevTodos.filter((t):boolean => t.id !== todo.id));
        setDoneTodos(prevDoneTodos => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo: TTodo): void => {
        setDoneTodos(prevDoneTodos => prevDoneTodos.filter((t):boolean => t.id !== todo.id));
    };

    return (
        <TodoContext.Provider 
        value= {{ todos, doneTodos, addTodo, completeTodo, deleteTodo}}
        >
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = (): ITodoContext => {
    const context = useContext(TodoContext);
    // 컨텍스트가 없는 경우
    if (!context) {
        throw new Error("useTodo를 사용하기 위해서는, 무조건 TodoProvider로 감싸야 한다.");
    }

    // 무조건 컨텍스트가 있는 경우
    return context;
}
