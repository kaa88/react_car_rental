import { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrency } from '../../../store/reducers/currencyReducer'
import { changeLanguage } from '../../../store/reducers/languageReducer'
import {getCssVariable} from '../../../services/utilities';
import classes from './OptionsSelect.module.scss';
import Icon from '../Icon/Icon';
import Select from '../Select/Select';
import Cookie from '../../../services/cookie'


const OptionsSelect = memo(function OptionsSelect({type, className = '', children, ...props}) {

	const dispatch = useDispatch()
	const Language = useSelector(state => state.language)
	const Currency = useSelector(state => state.currency)

	let [isReloadList, setReloadList] = useState(true)
	// let [isReloadLanguage, setReloadLanguage] = useState(false)

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

	const cookieExpireDays = 30
	const isCookieLog = true
	const setCookie = function(value) {
		if (value) {
			Cookie.setCookie({
				name: type,
				value: value,
				expires: cookieExpireDays,
			}, isCookieLog ? true : false )
		}
	}

	const handleSelect = function(value) {
		value = value.toLowerCase()
		setCookie(value)
		dispatch(categories[type].action(value))
		setReloadList(true) // change list by useEffect with delay
	}

	useEffect(() => {
		const transitionDelay = getCssVariable('timer-select')*1000
		setTimeout(() => {
			// if (isReloadLanguage) window.location.reload()
			if (isReloadList) {
				setReloadList(false)
				setSelectData(createSelectData())
			}
		}, transitionDelay)
	})

	// console.log('render OptionsSelect')
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