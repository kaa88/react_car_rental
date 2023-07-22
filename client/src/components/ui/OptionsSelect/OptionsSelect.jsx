import { useEffect, useMemo, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrency } from '../../../store/slices/currencySlice'
import { changeLanguage } from '../../../store/slices/languageSlice'
import {getCssVariable} from '../../../utilities/utilities';
import classes from './OptionsSelect.module.scss';
import Icon from '../Icon/Icon';
import Select from '../Select/Select';
import UserService from '../../../services/UserService';

const transitionDelay = getCssVariable('timer-select')*1000


const OptionsSelect = memo(function OptionsSelect({type, className = '', children, ...props}) {

	const dispatch = useDispatch()
	const Language = useSelector(state => state.language)
	const Currency = useSelector(state => state.currency)
	const userID = useSelector(state => state.user.id)

	// let [isReloadList, setReloadList] = useState(true)

	const categories = useMemo(function() {return {
		language: {
			data: Language,
			action: changeLanguage,
			get icon() {return 'icon-globe'}
		},
		currency: {
			data: Currency,
			action: changeCurrency,
			get icon() {return `icon-${this.data.current}`}
		},
	}}, [Language, Currency])

	const createSelectData = function() {
		const categoryData = categories[type].data
		let selected = categoryData.current.toUpperCase()
		let list = categoryData.list.map(item => item.toUpperCase()).filter(item => item !== selected)
		return {selected, list}
	}
	let [selectData, setSelectData] = useState(createSelectData())

	const handleSelect = function(value) {
		value = value.toLowerCase()
		dispatch(categories[type].action(value))
		if (userID) UserService.edit(userID, type, value)
		// setReloadList(true) // change list by useEffect with delay
	}

	useEffect(() => {
		setTimeout(() => {
			// if (isReloadList) {
				// setReloadList(false)
				// console.log('kajsdf');
				setSelectData(createSelectData())
			// }
		}, transitionDelay)
	}, [Language, Currency])

	return (
		<div className={classes.default}>
			<span className={classes.icon}>
				<Icon name={categories[type].icon} />
			</span>
			<Select modif='siteOptions' data={selectData} onSelect={handleSelect} />
		</div>
	)
})

export default OptionsSelect