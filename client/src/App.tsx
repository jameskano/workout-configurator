import { RouterProvider } from 'react-router-dom';
import './App.scss';
import AppRoutes from './routes/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ExerciseProvider } from './store/context/exercise-context/exercise-provider';
import { WorkoutProvider } from './store/context/workout-context/workout-provider';
import { FiltersProvider } from './store/context/filters-context/filters-provider';
import { CircularLoaderProvider } from './store/context/circular-loader-context/circular-loader-provider';
import { Suspense } from 'react';
import { ModalProvider } from './store/context/modal-context/modal-provider';
import CircularLoader from './UI/circular-loader/CircularLoader';
import { PopoverProvider } from './store/context/popover-context/popover-provider';
import { RegisterProvider } from './store/context/register-context/register-provider';
import { useLoginContext } from './store/context/login-context/login-context';
import Toast from './UI/toast/Toast';
import { useAxiosInterceptor } from './utils/functions/axios-setup';

function App() {
	const queryClient = new QueryClient();

	const { loadingTokenChecking } = useLoginContext();

	useAxiosInterceptor();

	const AppLoaderElement = () => {
		return (
			<div className='app-loader'>
				<CircularLoader />
			</div>
		);
	};

	return (
		<QueryClientProvider client={queryClient}>
			<RegisterProvider>
				<CircularLoaderProvider>
					<ExerciseProvider>
						<WorkoutProvider>
							<FiltersProvider>
								<ModalProvider>
									<PopoverProvider>
										{loadingTokenChecking ? (
											<AppLoaderElement />
										) : (
											<Suspense fallback={<AppLoaderElement />}>
												<RouterProvider router={AppRoutes()} />
											</Suspense>
										)}
										<Toast />
									</PopoverProvider>
								</ModalProvider>
							</FiltersProvider>
						</WorkoutProvider>
					</ExerciseProvider>
				</CircularLoaderProvider>
			</RegisterProvider>
		</QueryClientProvider>
	);
}

export default App;
