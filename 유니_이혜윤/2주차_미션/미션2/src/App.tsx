import { ThemeProvider } from "../context/ThemeProvider";
import ProfileCard from "../components/ProfileCard";
import ThemeToggleButton from "../components/ThemeToggleButton";

export default function App() {
  return (
    <ThemeProvider>
      <ThemeToggleButton />
      <ProfileCard />
    </ThemeProvider>
  );
}
