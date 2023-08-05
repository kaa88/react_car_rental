import classes from './CarName.module.scss';

const CarName = function({car, className = '', ...props}) {
	return <p className={`${className} ${classes.content}`}>{!!car && car.name}</p>
}
export default CarName