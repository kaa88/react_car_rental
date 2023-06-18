import { memo } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
import classes from './Main.module.scss';
import Banner from '../../parts/Banner/Banner';
import Cars from '../../parts/Cars/Cars';
import Faq from '../../parts/Faq/Faq';
import Feedback from '../../parts/Feedback/Feedback';


const Main = memo(function Main() {

	// const dispatch = useDispatch()
	// const headerMetrics = useSelector(state => state.headerMetrics)
	// console.log(headerMetrics);

	return (
		<main className={`${classes.main} scroll-lock-item-p`}>
			<Banner />
			<Cars />
			<Faq />
			<Feedback />
		</main>
	)
})

export default Main