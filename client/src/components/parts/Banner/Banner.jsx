import { memo } from 'react';
import classes from './Banner.module.scss';
import TranslateHandler from '../../TranslateHandler';
import Container from '../../ui/Container/Container';
import ReservationForm from '../ReservationForm/ReservationForm';
import Icon from '../../ui/Icon/Icon';
import Image from '../../ui/Image/Image';

const Banner = memo(function Banner() {

	const features = [
		{
			icon: "icon-lorry",
			iconSize: "47px",
			title: "Delivery to other town is possible",
			text: "Rent no matter where you are",
		},
		{
			icon: "icon-apostile",
			iconSize: "42px",
			title: "Fine cars",
			text: "All cars in perfect condition",
		},
		{
			icon: "icon-medal",
			iconSize: "42px",
			title: "Best price",
			text: "Don't even try to find better",
		},
	]

	return (
		<TranslateHandler>
			<section className={classes.banner}>
				<div className={classes.bg}>
					<Image src='img/bg.jpg' />
				</div>
				<Container>
					<h3 className='color01 fz36 tac'>
						?_Rent a car
					</h3>

					<ReservationForm className={classes.blur} />

					<div className={classes.features}>
						{features.map((item, index) =>
							<div className={`${classes.featuresItem} ${classes.blur}`} key={index}>
								<Icon className={classes.featuresIcon} name={item.icon} size={item.iconSize} />
								<p className={classes.featuresTitle}>{`?_${item.title}`}</p>
								<p className={classes.featuresText}>{`?_${item.text}`}</p>
							</div>
						)}
					</div>

				</Container>
			</section>
		</TranslateHandler>
	)
})

export default Banner