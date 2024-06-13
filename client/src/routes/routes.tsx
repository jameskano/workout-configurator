import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

const RootLayout = lazy(() => import('../components/root-layout/RootLayout'));
const WelcomePage = lazy(() => import('../pages/welcome-page/WelcomePage'));
const Layout = lazy(() => import('../components/layout/Layout'));
const ExercisesPage = lazy(() => import('../pages/exercises/ExercisesPage'));
const WorkoutsPage = lazy(() => import('../pages/workouts/WorkoutsPage'));
const NotFoundPage = lazy(() => import('../pages/not-found-page/NotFoundPage'));

const routes = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <NotFoundPage />,
		children: [
			{ path: '/', element: <WelcomePage /> },
			{
				path: '/exercises',
				element: <Layout currentPageComponent={<ExercisesPage />} />,
			},
			{
				path: '/workouts',
				element: <Layout currentPageComponent={<WorkoutsPage />} />,
			},
			// {
			//     path: "/account",
			//     element: <Layout currentPageComponent={<AccountPage />} />,
			// },
		],
	},
]);

export default routes;
