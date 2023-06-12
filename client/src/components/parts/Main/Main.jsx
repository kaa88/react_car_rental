import { useDispatch, useSelector } from 'react-redux'
import classes from './Main.module.scss';
import Banner from '../../parts/Banner/Banner';
import Cars from '../../parts/Cars/Cars';
import Faq from '../../parts/Faq/Faq';
import Feedback from '../../parts/Feedback/Feedback';


function Main() {

	const dispatch = useDispatch()
	const headerMetrics = useSelector(state => state.headerMetrics)
	// console.log(headerMetrics);

	return (
		<main className={`${classes.main} scroll-lock-item-p`} style={{marginTop: `${headerMetrics.headerHeight}px`}}>
			<Banner />
			<Cars />
			<Faq />
			<Feedback />
		</main>
	)
}

export default Main