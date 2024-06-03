import { RouterProvider } from 'react-router-dom';
import './App.scss';
import routes from './routes/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ExerciseProvider } from './store/context/exercise-context/exercise-provider';
import { WorkoutProvider } from './store/context/workout-context/workout-provider';
import { FiltersProvider } from './store/context/filters-context/filters-provider';
import { ToastProvider } from './store/context/toast-context/toast-provider';
import { CircularLoaderProvider } from './store/context/circular-loader-context/circular-loader-provider';
import { Suspense } from 'react';
import { ModalProvider } from './store/context/modal-context/modal-provider';
import BackdropLoader from './UI/backdrop-loader/BackdropLoader';
import { backdropConstants } from './utils/constants/backdrop';
import CircularLoader from './UI/circular-loader/CircularLoader';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<CircularLoaderProvider>
				<ExerciseProvider>
					<WorkoutProvider>
						<FiltersProvider>
							<ToastProvider>
								<ModalProvider>
									<Suspense
										fallback={
											<div className='app-loader'>
												<CircularLoader />
											</div>
										}>
										<RouterProvider router={routes} />
									</Suspense>
								</ModalProvider>
							</ToastProvider>
						</FiltersProvider>
					</WorkoutProvider>
				</ExerciseProvider>
			</CircularLoaderProvider>
		</QueryClientProvider>
	);
}

export default App;
