import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./routes/HomePage";
import AccountPage from "./routes/AccountPage";
import ErrorPage from "./routes/ErrorPage";
import TermsPage from "./routes/TermsPage";
import PolicyPage from "./routes/PolicyPage";


function Router() {

	const router = createBrowserRouter([
		{
			path: '/',
			element: <HomePage />,
			errorElement: <ErrorPage />
		},
		{
			path: '/account',
			element: <AccountPage />,
		},
		{
			path: '/terms',
			element: <TermsPage />,
		},
		{
			path: '/policy',
			element: <PolicyPage />,
		},
	])

	return <RouterProvider router={router} />
}

export default Router