import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Redux Provider 임포트
import { store } from "./app/store.ts"; // Redux 스토어 임포트
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
