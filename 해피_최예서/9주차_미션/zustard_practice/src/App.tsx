import './App.css'
import Counter from "./components/Counter.tsx";
import RandomNumberGenerator from "./components/RandomNumberGenerator.tsx";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1e1e1e",
        color: "#f5f5f5",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Counter />
      <RandomNumberGenerator />
    </div>
  )
}

export default App
