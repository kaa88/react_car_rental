import { memo } from 'react';
import classes from './Banner.module.scss';
import TranslateHandler from '../../TranslateHandler';
import Container from '../../ui/Container/Container';
import ReservationForm from '../Forms/ReservationForm/ReservationForm';
import Icon from '../../ui/Icon/Icon';
import Image from '../../ui/Image/Image';
import images from './img'
import Anchor from '../../ui/Anchor/Anchor';

const Banner = memo(function Banner() {

	const features = [
		{
			icon: "icon-lorry",
			title: "Delivery to other town is possible",
			text: "Rent no matter where you are",
		},
		{
			icon: "icon-apostile",
			title: "Fine cars",
			text: "All cars in perfect condition",
		},
		{
			icon: "icon-medal",
			title: "Best price",
			text: "Don't even try to find better",
		},
	]

	return (
		<TranslateHandler>
			<section className={classes.banner}>
				<Anchor name='rent' />

				<div className={classes.form}>
					<div className={classes.bg}>
						<Image src={images.bg1} />
					</div>
					<Container className={classes.container}>
						<h3 className={`${classes.formTitle} color01 fz36 tac`}>
							?_Rent a car
						</h3>
						<ReservationForm className={classes.blur} modif='short' />
					</Container>
				</div>

				<div className={classes.features}>
					<Container className={classes.container}>
						{features.map((item, index) =>
							<div className={`${classes.featuresItem} ${classes.blur}`} key={index}>
								<Icon className={classes.featuresIcon} name={item.icon} />
								<div className={classes.featuresContent}>
									<p className={classes.featuresTitle}>{`?_${item.title}`}</p>
									<p className={classes.featuresText}>{`?_${item.text}`}</p>
								</div>
							</div>
						)}
					</Container>
				</div>

			</section>
		</TranslateHandler>
	)
})

export default Banner