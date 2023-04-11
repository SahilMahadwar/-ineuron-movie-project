import { Navbar } from "@/components/Navbar/Navbar";
import { queryClient } from "@/libs/reactQuery/queryClient";
import { Router } from "@/routes/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
