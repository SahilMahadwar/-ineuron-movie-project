import { useUser } from "@/hooks/use-user";
import { queryKeys } from "@/libs/react-query/constants";
import { queryClient } from "@/libs/react-query/query-client";

export const HomePage = () => {
  const { user, error, isError, isLoading } = useUser();

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};
