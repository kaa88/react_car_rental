import Banner from '../../components/parts/Banner/Banner';
import Cars from '../../components/parts/Cars/Cars';
import Faq from '../../components/parts/Faq/Faq';
import Feedback from '../../components/parts/Feedback/Feedback';
import DefaultLayout from '../layouts/DefaultLayout';

function HomePage() {

	return (
		<DefaultLayout>
			<Banner />
			<Cars />
			<Faq />
			<Feedback />
		</DefaultLayout>
	)
}

export default HomePage