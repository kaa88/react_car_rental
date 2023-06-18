import { memo } from 'react';
import classes from './Banner.module.scss';
import Container from '../../ui/Container/Container';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';
import Divider from '../../ui/Divider/Divider';
import Image from '../../ui/Image/Image';
import InputText from '../../ui/InputText/InputText';
import InputCheckbox from '../../ui/Checkbox/InputCheckbox';
import {Translate} from '../../../script/translate';

const Banner = memo(function Banner() {
	return (
		<Translate>
			<section className={classes.banner}>
				<div className={classes.bg}>
					<Image src='img/bg.jpg' />
				</div>
				<Container>
					<h3 className='color01 fz36 tac'>
						?_Rent a car
					</h3>

					<form className={`${classes.reserveForm} ${classes.blur}`} action="#">
						<div className={classes.formItem}>
							<p className={`${classes.formItemTitle} color01`}>?_Location</p>
							<InputText />
						</div>
						<Divider />
						<div className={classes.formItem}>
							<p className={`${classes.formItemTitle} color01`}>?_Pick up</p>
							<InputText />
							<InputText />
						</div>
						<div className={classes.formItem}>
							<p className={`${classes.formItemTitle} color01`}>?_Return</p>
							<InputText />
							<InputText />
						</div>
						<Divider />
						<Button className={classes.submitBtn} type='submit'>?_Reserve</Button>
						<div className={classes.formCheckboxes}>
							<InputCheckbox>?_Driver's age 21+</InputCheckbox>
							<InputCheckbox>?_Return to different location</InputCheckbox>
						</div>
					</form>

					<div className={`${classes.features} color01 tac`}>
						<div className={`${classes.featuresItem} ${classes.blur}`}>
							<Icon className={classes.icon} name='icon-lorry' size='47px' />
							<p className='fz20'>?_Delivery to other town is possible</p>
							<p>?_Rent no matter where you are</p>
						</div>
						<div className={`${classes.featuresItem} ${classes.blur}`}>
							<Icon className={classes.icon} name='icon-apostile' size='42px' />
							<p className='fz20'>?_Fine cars</p>
							<p>?_All cars in perfect condition</p>
						</div>
						<div className={`${classes.featuresItem} ${classes.blur}`}>
							<Icon className={classes.icon} name='icon-medal' size='42px' />
							<p className='fz20'>?_Best price</p>
							<p>?_Don't even try to find better</p>
						</div>
					</div>

				</Container>
			</section>
		</Translate>
	)
})

export default Banner