import type { ReactElement } from "react";
import { WelcomeData } from "./components/UserDataDisplay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App(): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <WelcomeData />
    </QueryClientProvider>
  );
}

export default App;
