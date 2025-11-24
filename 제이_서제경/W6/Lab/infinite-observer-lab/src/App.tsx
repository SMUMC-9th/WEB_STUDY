import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import InfinitePostsAutoJsonPlaceholder from "./components/InfinitePostsAutoJsonPlaceholder";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InfinitePostsAutoJsonPlaceholder />
    </QueryClientProvider>
  );
}

export default App;
