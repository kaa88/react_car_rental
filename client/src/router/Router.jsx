import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import ErrorPage from "./pages/ErrorPage";
import TermsPage from "./pages/TermsPage";
import PolicyPage from "./pages/PolicyPage";
import RequireAuth from "./RequireAuth";
import RequireNoAuth from "./RequireNoAuth";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RestorePasswordPage from "./pages/RestorePasswordPage";
import ReservationPage from "./pages/ReservationPage";
import { scriptManager } from "../utilities/scriptManager";


function Router() {

	const router = createBrowserRouter(
		[
			{
				path: '*',
				element: <ErrorPage />,
			},
			{
				path: '/',
				loader: customLoader,
				element: <HomePage />,
			},
			{
				path: '/account',
				loader: customLoader,
				element:
					<RequireAuth>
						<AccountPage />
					</RequireAuth>,
			},
			{
				path: '/reservation',
				loader: customLoader,
				element:
					<RequireAuth>
						<ReservationPage />
					</RequireAuth>,
			},
			{
				path: '/login',
				loader: customLoader,
				element:
					<RequireNoAuth>
						<LoginPage />
					</RequireNoAuth>,
			},
			{
				path: '/register',
				loader: customLoader,
				element:
					<RequireNoAuth>
						<RegisterPage />
					</RequireNoAuth>,
			},
			{
				path: '/restore_password',
				loader: customLoader,
				element:
					<RequireNoAuth>
						<RestorePasswordPage />
					</RequireNoAuth>,
			},
			{
				path: '/terms',
				element: <TermsPage />,
			},
			{
				path: '/policy',
				element: <PolicyPage />,
			},
		],
		{
			basename: process.env.REACT_APP_HOST_BASENAME || ''
		}
	)

	return <RouterProvider router={router} />
}

export default Router


function customLoader() {
	window.scrollTo({top: 0})
	window.dispatchEvent(new Event('click')) // Closes opened popups if routes through history like using 'return' button. See events in 'initScripts.js'
	if (scriptManager.components?.scrollLock?.calcScrollbarWidth) scriptManager.components.scrollLock.calcScrollbarWidth()
	if (scriptManager.components?.modal?.close) scriptManager.components.modal.close()
	if (scriptManager.components?.header?.closeMenu) scriptManager.components.header.closeMenu()
	return null
}
