import { RouterProvider } from 'react-router-dom';
import './App.scss';
import routes from './routes/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ExerciseProvider } from './store/context/exercise-context/exercise-provider';
import { WorkoutProvider } from './store/context/workout-context/workout-provider';
import { FiltersProvider } from './store/context/filters-context/filters-provider';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ExerciseProvider>
				<WorkoutProvider>
					<FiltersProvider>
						<RouterProvider router={routes} />
					</FiltersProvider>
				</WorkoutProvider>
			</ExerciseProvider>
		</QueryClientProvider>
	);
}

export default App;
