import { useSelector } from 'react-redux';
import classes from './CarPrice.module.scss';
import Icon from '../../../ui/Icon/Icon';
import TranslateHandler from '../../../TranslateHandler';

const CarPrice = function({car, className = ''}) {

	const currencyStore = useSelector(state => state.currency)
	let currency = {
		name: currencyStore.current,
		rate: currencyStore.rates[currencyStore.current]
	}

	return (
		<TranslateHandler>
			<p className={`${className} ${classes.wrapper}`}>
				<span className='bold'>
					{!!car && Math.round(car.price * currency.rate)}
				</span>
				<span>
					<Icon className={classes.currencyIcon} name={`icon-${currency.name}`} />
				</span>
				<span>/</span>
				<span>?_per day</span>
			</p>
		</TranslateHandler>
	)
}
export default CarPrice