import Footer from "../../components/parts/Footer/Footer"
import Header from "../../components/parts/Header/Header"
import Main from "../../components/parts/Main/Main"
import Modal from "../../components/ui/Modal/Modal"
import PageTitle from "../PageTitle"

function DefaultLayout({children, pageTitle = ''}) {

	return (
		<>
			<PageTitle value={pageTitle} />
			<Header />
			<Main>{children}</Main>
			<Footer />
			<Modal />
		</>
	)
}

export default DefaultLayout