import { useCallback, useEffect, useMemo, useState, memo } from 'react';
// import { useDispatch, useSelector } from 'react-redux'
import { useCustomElement } from '../../../hooks/useCustomElement';
// import { changeCurrency } from '../../../store/reducers/currencyReducer'
// import { changeLanguage } from '../../../store/reducers/languageReducer'
import script from './Select.script'
import classes from './Select.module.scss';
import Icon from '../Icon/Icon';

export let actualElems = {}

const Select = memo(function Select({className = '', children, data, onSelect, ...props}) {

	console.log(data);

	// const dispatch = useDispatch()
	// const Language = useSelector(state => state.language)
	// const Currency = useSelector(state => state.currency)
	// let [reloadList, setReloadList] = useState(true)
	// let [reloadLanguage, setReloadLanguage] = useState(false)

	// const dataTypes = useMemo(function() {return {
	// 	language: {
	// 		data: Language,
	// 		action: changeLanguage,
	// 		finally() {
	// 			setReloadList(true) // change list by useEffect with delay
	// 			setReloadLanguage(true) // translate by page reload
	// 		},
	// 		get icon() {return 'icon-globe'}
	// 	},
	// 	currency: {
	// 		data: Currency,
	// 		action: changeCurrency,
	// 		finally() {
	// 			setReloadList(true)
	// 		},
	// 		get icon() {return `icon-${data.current}`}
	// 	},
	// 	month: {
	// 		data: propData,
	// 		action: changeCurrency,
	// 		finally() {
	// 			// setReloadList(true)
	// 		},
	// 		get icon() {return ''}
	// 	},
	// }}, [Language, Currency, data])

	// data = useMemo(() => dataTypes[type].data, [dataTypes, type])

	const defaultData = {
		selected: '',
		list: []
	}
	if (typeof data !== 'object' || Array.isArray(data)) data = defaultData
	
	const toggleList = function(event) {
		script.toggleList(event)
	}
	const selectItem = useCallback((event) => {
		script.selectItem(event)
	}, [])

	let customOptionList = useMemo(() => data.list.map((item, index) =>
		<li className={classes.option} onClick={selectItem} key={index}>
			{item}
		</li>
	), [data, selectItem])

	const select = useCustomElement(`${className} ${classes.select}`)
	const header = useCustomElement(classes.header)
	const headerText = useCustomElement(classes.headerText, data.selected)
	const listWrapper = useCustomElement(classes.listWrapper)
	const list = useCustomElement(classes.list, customOptionList)

	actualElems = {
		select,
		header,
		headerText,
		listWrapper,
		list,
	}

	useEffect(() => { //once
		script.init({classes, onSelect})
		script.setupEvents()
		return () => script.removeEvents()
	}, [])

	// useEffect(() => {
	// 	const transitionDelay = parseFloat(getComputedStyle(document.body).getPropertyValue('--timer-select'))*1000 || 0;
	// 	setTimeout(() => {
	// 		if (reloadLanguage) window.location.reload()
	// 		if (reloadList) {
	// 			setReloadList(false)
	// 			list.setChildren(customOptionList)
	// 		}
	// 	}, transitionDelay)
	// })

	// console.log('render Select')
	return (
		<div className={select.className} ref={select.ref} {...props}>
			<div className={header.className} ref={header.ref} onClick={toggleList}>
				<span className={headerText.className} ref={headerText.ref}>{headerText.children}</span>
				<span className={classes.headerExpandIcon}>
					<Icon name='icon-arrow-short' />
				</span>
			</div>
			<div className={listWrapper.className} ref={listWrapper.ref} onClick={toggleList}>
				<ul className={list.className} ref={list.ref}>
					{list.children}
				</ul>
			</div>
		</div>
	)
})

export default Select