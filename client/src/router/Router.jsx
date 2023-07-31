import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import ErrorPage from "./pages/ErrorPage";
import TermsPage from "./pages/TermsPage";
import PolicyPage from "./pages/PolicyPage";
import RequireAuth from "./RequireAuth";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RestorePasswordPage from "./pages/RestorePasswordPage";


function Router() {

	const router = createBrowserRouter([
		{
			path: '*',
			element: <ErrorPage />,
		},
		{
			path: '/',
			element: <HomePage />,
		},
		{
			path: '/account',
			element:
				<RequireAuth>
					<AccountPage />
				</RequireAuth>,
		},
		{
			path: '/login',
			element: <LoginPage />,
		},
		{
			path: '/register',
			element: <RegisterPage />,
		},
		{
			path: '/restore_password',
			element: <RestorePasswordPage />,
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