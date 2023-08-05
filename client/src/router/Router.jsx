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
import ReservationPage from "./pages/ReservationPage";


function Router() {

	const router = createBrowserRouter([
		{
			path: '*',
			element: <ErrorPage />,
		},
		{
			path: '/',
			loader: scrollToTop,
			element: <HomePage />,
		},
		{
			path: '/account',
			loader: scrollToTop,
			element:
				<RequireAuth>
					<AccountPage />
				</RequireAuth>,
		},
		{
			path: '/reservation',
			loader: scrollToTop,
			element:
				<RequireAuth>
					<ReservationPage />
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


function scrollToTop() {
	window.scrollTo({top: 0})
	return null
}
