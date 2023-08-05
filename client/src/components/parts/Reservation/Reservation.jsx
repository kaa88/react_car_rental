import { memo } from 'react';
import classes from './Reservation.module.scss';
import Container from '../../ui/Container/Container';
import TranslateHandler from '../../TranslateHandler';
import ReservationForm from '../Forms/ReservationForm/ReservationForm';



const Reservation = memo(function Reservation() {

	return (
		<TranslateHandler>
			<section className={classes.wrapper}>
				<Container className={classes.container}>
					<h3 className='fz36 color02 tac'>?_Last step to make a reservation</h3>

					<ReservationForm className={classes.form} modif='full' />

				</Container>
			</section>
		</TranslateHandler>
	)
})

export default Reservation