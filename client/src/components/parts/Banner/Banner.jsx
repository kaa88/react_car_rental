import React from 'react';
import classes from './Banner.module.css';
import Container from '../../ui/Container/Container';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';
import Divider from '../../ui/Divider/Divider';
import Image from '../../ui/Image/Image';
import InputText from '../../ui/InputText/InputText';
import InputCheckbox from '../../ui/Checkbox/InputCheckbox';

function Banner() {
	return (
		<section className={classes.banner}>
			<div className={classes.bg}>
				<Image src='img/bg.jpg' />
			</div>
			<Container>
				<h3 className='color01 fz36 tac'>
					Rent a car
				</h3>

				<form className={`${classes.reserveForm} ${classes.blur}`} action="#">
					<div className={classes.formItem}>
						<p className={`${classes.formItemTitle} color01`}>Location</p>
						<InputText />
					</div>
					<Divider />
					<div className={classes.formItem}>
						<p className={`${classes.formItemTitle} color01`}>Pick up</p>
						<InputText />
						<InputText />
					</div>
					<div className={classes.formItem}>
						<p className={`${classes.formItemTitle} color01`}>Return</p>
						<InputText />
						<InputText />
					</div>
					<Divider />
					<Button className={classes.submitBtn} type='submit'>Reserve</Button>
					<div className={classes.formCheckboxes}>
						<InputCheckbox>Driver's age 21+</InputCheckbox>
						<InputCheckbox>Return to different location</InputCheckbox>
					</div>
				</form>

				<div className={`${classes.features} color01 tac`}>
					<div className={`${classes.featuresItem} ${classes.blur}`}>
						<Icon className={classes.icon} name='icon-lorry' size='47px' />
						<p className='fz20'>Delivery to other town is possible</p>
						<p>Rent no matter where you are</p>
					</div>
					<div className={`${classes.featuresItem} ${classes.blur}`}>
						<Icon className={classes.icon} name='icon-apostile' size='42px' />
						<p className='fz20'>Fine cars</p>
						<p>All cars in perfect condition</p>
					</div>
					<div className={`${classes.featuresItem} ${classes.blur}`}>
						<Icon className={classes.icon} name='icon-medal' size='42px' />
						<p className='fz20'>Best price</p>
						<p>Don't even try to find better</p>
					</div>
				</div>

			</Container>
		</section>
	)
}

export default Banner