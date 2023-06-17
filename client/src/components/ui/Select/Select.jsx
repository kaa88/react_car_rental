import { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useCustomElement } from '../../../hooks/useCustomElement';
import { changeCurrency } from '../../../store/reducers/currencyReducer'
import { changeLanguage } from '../../../store/reducers/languageReducer'
import script from './Select.script'
import classes from './Select.module.scss';
import Icon from '../Icon/Icon';

const Select = memo(function Select({type, className = '', children, ...props}) {

	const dispatch = useDispatch()
	const Language = useSelector(state => state.language)
	const Currency = useSelector(state => state.currency)

	let Data;
	const dataTypes = useMemo(function() {return {
		language: {
			data: Language,
			action: changeLanguage,
			get icon() {return 'icon-globe'}
		},
		currency: {
			data: Currency,
			action: changeCurrency,
			get icon() {return `icon-${Data.current}`}
		},
	}}, [Language, Currency, Data])

	Data = useMemo(() => dataTypes[type].data, [dataTypes, type])

	const select = useCustomElement(`${className} ${classes.select}`)
	const header = useCustomElement(classes.header)
	const headerText = useCustomElement(classes.headerText, Data.current.toUpperCase())
	const listWrapper = useCustomElement(classes.listWrapper)
	const list = useCustomElement(classes.list)

	let [reloadList, setReloadList] = useState(true)
	let [reloadLanguage, setReloadLanguage] = useState(false)

	function toggleList(e) {
		script.toggleList(e, {header, listWrapper, list}, classes) // elems
	}
	
	const selectItem = useCallback((event) => {
		let value = script.selectItem(event, {headerText}, Data) //elems
		dispatch(dataTypes[type].action(value))
		setReloadList(true) // change list by useEffect with delay
		if (type === 'language') setReloadLanguage(true)
	}, [Data, dataTypes, type, dispatch, headerText])

	let customOptionList = useMemo(() => Data.list.map((item, index) => {
		if (item !== Data.current) return (
			<li className={classes.option} onClick={selectItem} key={index}>
				{item.toUpperCase()}
			</li>
		)
		else return null
	}), [Data, selectItem])

	useEffect(() => { //once
		script.setupWindowEvents({header, listWrapper, list}, classes)// elems
	}, [])

	useEffect(() => {
		const transitionDelay = 300 // todo: use css variable
		setTimeout(() => {
			if (reloadLanguage) window.location.reload()
			if (reloadList) {
				setReloadList(false)
				list.setChildren(customOptionList)
			}
		}, transitionDelay)
	})


	// console.log('render Select')
	return (
		<div className={select.className} ref={select.ref} {...props}>
			<span className={classes.typeIcon}>
				<Icon name={dataTypes[type].icon} />
			</span>
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