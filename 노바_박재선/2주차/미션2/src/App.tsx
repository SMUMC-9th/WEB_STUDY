import './App.css'
import Card from './components/Card';
import { ThemeProvider} from './context/ThemeContext';


export default function App() {
  return (
    <ThemeProvider>
      <Card/>
    </ThemeProvider>
  )
}
