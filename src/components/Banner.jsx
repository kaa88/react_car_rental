import React from 'react';
import classes from './Banner.module.css';
import Container from './Container';
import Icon from './ui/Icon';
import TextButton from './ui/TextButton';
import Divider from './ui/Divider';
import Image from './ui/Image';
import Text from './ui/Text';
import TextTitle from './ui/TextTitle';

function Banner() {
	return (
		<section className={classes.banner}>
			<div className={classes.bg}>
				<Image src='img/bg.jpg' />
			</div>
			<Container>
				<TextTitle style={{color: 'var(--color01)'}}>
					Rent a car
				</TextTitle>

				<form className={classes.reserveForm} action="#">

				</form>

				<div className={classes.features}>
					<div className={classes.item}>
						<Icon name='icon-lorry' />
						<p className="title">Delivery to other town is possible</p>
						<p className="text">Rent no matter where you are</p>
					</div>
				</div>
				<div className={classes.features}>
					<div className={classes.item}>
						<Icon name='icon-apostile' />
						<p className="title">Fine cars</p>
						<p className="text">All cars in perfect condition</p>
					</div>
				</div>
				<div className={classes.features}>
					<div className={classes.item}>
						<Icon name='icon-medal' />
						<p className="title">Best price</p>
						<p className="text">Don't even try to find better</p>
					</div>
				</div>

			</Container>
		</section>
	)
}

export default Banner