import classes from './CarImage.module.scss';
import images from '../img';
import Image from '../../../ui/Image/Image';

const CarImage = function({car, className = '', ...props}) {

	return (
		<div className={`${className} ${classes.wrapper}`}>
			{!!car && <Image src={images[car.shortName]} {...props} />}
		</div>
	)
}
export default CarImage