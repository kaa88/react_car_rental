import './Rating.scss';
import Icon from '../Icon/Icon';


const Rating = function({className = '', onChange = function(){}}) {

	function setRatingValue(e) {
		e.stopPropagation()
		onChange(e.currentTarget.dataset.value)
	}

	function fillRating() {
		const numberOfElems = 5
		let radios = []
		let labels = []
	
		for (let i = 1; i <= numberOfElems; i++) {
			radios.push(
				<input
					type='radio'
					name='rating'
					id={`rating-radio-${i}`}
					key={`rating-r${i}`}
				/>
			)
			labels.push(
				<label
					htmlFor={`rating-radio-${i}`}
					id={`rating-btn-${i}`}
					key={`rating-b${i}`}
					data-value={i}
					onClick={setRatingValue}
				>
					<Icon name='icon-star'/>
				</label>
			)
		}
		return (
			<div className={`${className} Rating__wrapper`}>
				{radios}
				<div className='Rating__labels'>{labels}</div>
			</div>
		)
	}

	return fillRating()
}

export default Rating