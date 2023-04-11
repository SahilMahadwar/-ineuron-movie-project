import { Navbar } from "@/components/Navbar/Navbar";
import { queryClient } from "@/libs/reactQuery/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className="mt-[1500px]">2</div>

      {/* <div className="text-9xl  font-semibold max-w-7">Tailwind?</div> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
