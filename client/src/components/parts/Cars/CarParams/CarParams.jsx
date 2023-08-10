import classes from './CarParams.module.scss';
import Icon from '../../../ui/Icon/Icon';
import TranslateHandler from '../../../TranslateHandler';

const CarParams = function({car, carParams, className = ''}) {
	
	return (
		<TranslateHandler>
			<div className={`${className} ${classes.wrapper}`}>
				{!!car && !!carParams && carParams.map((param, i) =>
					<div className={classes.item} key={i}>
						{param.abbr &&
							<Icon className={classes.icon} name={`icon-${param.abbr}`} />
						}
						{param.name && car.params[i] &&
							<p>{`?_${param.name}`}: <span className='bold'>{`?_${car.params[i]}`}</span></p>
						}
					</div>
				)}
			</div>
		</TranslateHandler>
	)
}
export default CarParams