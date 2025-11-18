import './App.css'
import Navbar from "./components/Navbar.tsx";
import CartList from "./components/CartList.tsx";
import store from "./store/store.ts";
import {Provider} from "react-redux";
import PriceBox from "./components/PriceBox.tsx";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <PriceBox />
    </Provider>
  )
}

export default App