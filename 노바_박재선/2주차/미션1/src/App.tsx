import { TodoProvider } from "./context/TodoContext"
import Todo from "./components/Todo"
function App() {
  return (
    <TodoProvider>
        <Todo />
    </TodoProvider>
  )
}

export default App
