import PageTitle from "../PageTitle"
import Main from "../../components/parts/Main/Main"
import LiteHeader from "../../components/parts/Header/LiteHeader/LiteHeader"

function LiteLayout({children, pageTitle = ''}) {

	return (
		<>
			<PageTitle value={pageTitle} />
			<LiteHeader />
			<Main modif='lite'>{children}</Main>
		</>
	)
}

export default LiteLayout