import { Provider } from "react-redux";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import store from "./store/store";
import TotalPrice from "./components/TotalPrice";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <TotalPrice />
    </Provider>
  );
}

export default App;
