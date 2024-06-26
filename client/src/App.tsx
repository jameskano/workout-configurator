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
import CircularLoader from './UI/circular-loader/CircularLoader';
import { PopoverProvider } from './store/context/popover-context/popover-provider';
import { RegisterProvider } from './store/context/register-context/register-provider';
import { LoginProvider } from './store/context/login-context/login-provider';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<RegisterProvider>
				<LoginProvider>
					<CircularLoaderProvider>
						<ExerciseProvider>
							<WorkoutProvider>
								<FiltersProvider>
									<ToastProvider>
										<ModalProvider>
											<PopoverProvider>
												<Suspense
													fallback={
														<div className='app-loader'>
															<CircularLoader />
														</div>
													}>
													<RouterProvider router={routes} />
												</Suspense>
											</PopoverProvider>
										</ModalProvider>
									</ToastProvider>
								</FiltersProvider>
							</WorkoutProvider>
						</ExerciseProvider>
					</CircularLoaderProvider>
				</LoginProvider>
			</RegisterProvider>
		</QueryClientProvider>
	);
}

export default App;
