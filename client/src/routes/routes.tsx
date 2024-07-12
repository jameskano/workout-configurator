import { Navigate, createBrowserRouter } from 'react-router-dom';
import { lazy, useEffect, useRef, useState } from 'react';
import { useLoginContext } from '../store/context/login-context/login-context';

const RootLayout = lazy(() => import('../components/root-layout/RootLayout'));
const WelcomePage = lazy(() => import('../pages/welcome-page/WelcomePage'));
const Layout = lazy(() => import('../components/layout/Layout'));
const ExercisesPage = lazy(() => import('../pages/exercises/ExercisesPage'));
const WorkoutsPage = lazy(() => import('../pages/workouts/WorkoutsPage'));
const NotFoundPage = lazy(() => import('../pages/not-found-page/NotFoundPage'));

const AppRoutes = () => {
	const { token } = useLoginContext();

	const routes = createBrowserRouter([
		{
			path: '/',
			element: <RootLayout />,
			errorElement: <NotFoundPage />,
			children: [
				{ path: '/', element: <WelcomePage /> },
				{
					path: '/exercises',
					element:
						token !== '' ? (
							<Layout currentPageComponent={<ExercisesPage />} />
						) : (
							<Navigate to={'/'} />
						),
				},
				{
					path: '/workouts',
					element:
						token !== '' ? (
							<Layout currentPageComponent={<WorkoutsPage />} />
						) : (
							<Navigate to={'/'} />
						),
				},
			],
		},
	]);

	return routes;
};

export default AppRoutes;
