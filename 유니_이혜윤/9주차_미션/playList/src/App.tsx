import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import TotalPrice from "./components/TotalPrice";

function App() {
  return (
    <div>
      <Navbar />
      <CartList />
      <TotalPrice />
    </div>
  );
}

export default App;
