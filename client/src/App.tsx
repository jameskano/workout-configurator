import { RouterProvider } from "react-router-dom";
import "./App.scss";
import routes from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
        </QueryClientProvider>
    );
}

export default App;
