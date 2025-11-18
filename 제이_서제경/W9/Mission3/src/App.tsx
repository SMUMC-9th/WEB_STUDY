import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/route";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
