import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "./components/dashboard/Dashboard";
import { DashboardProvider } from "./components/dashboard/DashboardProvider";
import Header from "./components/header/Header";

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

function App() {
  return (
    <div className="relative h-screen">
      <QueryClientProvider client={queryClient}>
        <Header />
        <DashboardProvider>
          <Dashboard />
        </DashboardProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
