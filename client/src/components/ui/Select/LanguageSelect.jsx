import { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useCustomElement } from '../../../hooks/useCustomElement';
import { changeCurrency } from '../../../store/reducers/currencyReducer'
import { changeLanguage } from '../../../store/reducers/languageReducer'
// import script from './LanguageSelect.script'
// import classes from './LanguageSelect.module.scss';
import Icon from '../Icon/Icon';
import Select from './Select';

// export let actualElems = {}

const LanguageSelect = memo(function LanguageSelect({type, className = '', children, ...props}) {

	const dispatch = useDispatch()
	const Language = useSelector(state => state.language)
	const Currency = useSelector(state => state.currency)
	let [reloadList, setReloadList] = useState(true)
	let [reloadLanguage, setReloadLanguage] = useState(false)

	let Data;
	const dataTypes = useMemo(function() {return {
		language: {
			data: Language,
			action: changeLanguage,
			finally() {
				setReloadList(true) // change list by useEffect with delay
				setReloadLanguage(true) // translate by page reload
			},
			get icon() {return 'icon-globe'}
		},
		currency: {
			data: Currency,
			action: changeCurrency,
			finally() {
				setReloadList(true)
			},
			get icon() {return `icon-${Data.current}`}
		},
	}}, [Language, Currency, Data])

	console.log(type);
	console.log(dataTypes[type]);
	Data = useMemo(() => dataTypes[type].data, [dataTypes, type])

	// const select = useCustomElement(`${className} ${classes.select}`)
	// const header = useCustomElement(classes.header)
	// const headerText = useCustomElement(classes.headerText, Data.current.toUpperCase())
	// const listWrapper = useCustomElement(classes.listWrapper)
	// const list = useCustomElement(classes.list)

	// actualElems = {
	// 	select,
	// 	header,
	// 	headerText,
	// 	listWrapper,
	// 	list,
	// }

	// const toggleList = function(event) {
	// 	script.toggleList(event)
	// }
	// const selectItem = useCallback((event) => {
	// 	script.selectItem(event)
	// }, [])

	// let customOptionList = useMemo(() => Data.list.map((item, index) => {
	// 	if (item !== Data.current) return (
	// 		<li className={classes.option} onClick={selectItem} key={index}>
	// 			{item.toUpperCase()}
	// 		</li>
	// 	)
	// 	else return null
	// }), [Data, selectItem])

	// useEffect(() => { //once
	// 	script.init({dataTypes, type, classes, dispatch})
	// 	script.setupEvents()
	// 	return () => script.removeEvents()
	// }, [])

	useEffect(() => {
		const transitionDelay = parseFloat(getComputedStyle(document.body).getPropertyValue('--timer-select'))*1000 || 0;
		setTimeout(() => {
			if (reloadLanguage) window.location.reload()
			if (reloadList) {
				setReloadList(false)
				// list.setChildren(customOptionList)
			}
		}, transitionDelay)
	})


	const data = {
		selected: 'EN',
		list: ['RU','DE','IT']
	}
	const onSelectHandler = function() {
		// this.setCookie = dataTypes[type].data.setCookie
		// this.setState = (value) => dispatch(dataTypes[type].action(value))
		// this.finally = dataTypes[type].finally

		// value = value.toLowerCase()
		// this.setCookie(value)
		// this.setState(value)
		// this.finally()
	}
	console.log(data);

	// console.log('render LanguageSelect')
	return (
		<div className="langSelect">
			{/* <span className={classes.typeIcon}> */}
				{/* <Icon name={dataTypes[type].icon} /> */}
			{/* </span> */}
			<Select data={data} onSelect={onSelectHandler} />
		</div>
	)
})

export default LanguageSelect