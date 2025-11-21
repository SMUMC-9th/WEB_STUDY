import { RouterProvider } from "react-router-dom";
import { router } from "./router/route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, //몇 번이나 재시도할지 설정
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

// {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
// dev 환경일 때만 Devtool을 키겠다고 선언
