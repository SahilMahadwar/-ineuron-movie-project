import { queryClient } from "@/libs/react-query/query-client";
import { Router } from "@/routes/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>{" "}
    </CookiesProvider>
  );
}

export default App;
