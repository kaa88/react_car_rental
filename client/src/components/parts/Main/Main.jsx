import classes from './Main.module.scss';
import Banner from '../../parts/Banner/Banner';
import Cars from '../../parts/Cars/Cars';
import Faq from '../../parts/Faq/Faq';
import Feedback from '../../parts/Feedback/Feedback';


function Main() {

	return (
		<main className={classes.main}>
			<Banner />
			<Cars />
			<Faq />
			<Feedback />
		</main>
	)
}

export default Main