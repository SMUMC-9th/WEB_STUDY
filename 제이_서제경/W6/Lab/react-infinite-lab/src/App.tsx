import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import InfinitePostsJsonPlaceholder from "./components/InfinitePostsJsonPlaceholder";

// new QueryClient(): React Query의 중앙 관리 객체를 만든다.
// QueryClientProvider: 하위 컴포넌트에 기능을 전달한다.

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InfinitePostsJsonPlaceholder />
    </QueryClientProvider>
  );
}

export default App;
