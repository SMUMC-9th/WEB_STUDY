import './app.css';
import Todo_v2 from "./components/Todo_v2.tsx";
import {TodoProvider} from "./context/TodoContext.tsx";
function App()  {
  return(
    <div className="App">
      <TodoProvider>
        <Todo_v2 />
      </TodoProvider>
    </div>
  )
}

export default App;