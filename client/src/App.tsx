import { RouterProvider } from "react-router-dom";
import "./App.scss";
import routes from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExerciseProvider } from "./store/context/exercise-context/exercise-provider";
import { WorkoutProvider } from "./store/context/workout-context/workout-provider";

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ExerciseProvider>
				<WorkoutProvider>
					<RouterProvider router={routes} />
				</WorkoutProvider>
			</ExerciseProvider>
		</QueryClientProvider>
	);
}

export default App;
