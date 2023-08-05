import classes from './CarOptions.module.scss';
import TranslateHandler from '../../../TranslateHandler';

const CarOptions = function({car, optionNames = [], className = ''}) {

	if (!car?.options || !optionNames.length) return null

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.wrapper}`}>
				{!!car && car.options.map((option, i) => {
					let item = optionNames.find((item) => item.id === option)
					return item ? <p key={i}>{`?_${item.name}`}</p> : ''
				})}
			</div>
		</TranslateHandler>
	)
}
export default CarOptions