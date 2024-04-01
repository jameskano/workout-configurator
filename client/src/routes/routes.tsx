import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/root-layout/RootLayout";
import WelcomePage from "../pages/welcome-page/WelcomePage";
import Layout from "../components/layout/Layout";
import ExercisesPage from "../pages/exercises/ExercisesPage";
import WorkoutsPage from "../pages/workouts/WorkoutsPage";
import NotFoundPage from "../pages/not-found-page/NotFoundPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFoundPage />,
        children: [
            { path: "/", element: <WelcomePage /> },
            {
                path: "/exercises",
                element: <Layout currentPageComponent={<ExercisesPage />} />,
            },
            {
                path: "/workouts",
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
