import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useCustomElement } from '../../../hooks/useCustomElement';
import { changeCurrency } from '../../../store/reducers/currencyReducer'
import { changeLanguage } from '../../../store/reducers/languageReducer'
import script from './Select.script'
import classes from './Select.module.scss';
import Icon from '../Icon/Icon';

function Select({type, className = '', children, ...props}) {

	const dispatch = useDispatch()
	const Language = useSelector(state => state.language)
	const Currency = useSelector(state => state.currency)

	const dataTypes = useMemo(function() {return {
		language: {
			data: Language,
			action: changeLanguage
		},
		currency: {
			data: Currency,
			action: changeCurrency
		},
	}}, [Language, Currency])

	const Data = useMemo(() => dataTypes[type].data, [dataTypes, type])

	let [reloadLanguage, setReloadLanguage] = useState(false)

	const elems = { // always render, dont add it to dependencies
		select: useCustomElement(`${className} ${classes.select}`),
		header: useCustomElement(classes.header),
		headerText: useCustomElement(classes.headerText, Data.current.toUpperCase()),
		headerExpandIcon: useCustomElement(classes.headerExpandIcon),
		listWrapper: useCustomElement(classes.listWrapper),
		list: useCustomElement(classes.list),
		typeIcon: useCustomElement(classes.typeIcon),
	}
	elems.typeIcon.iconName = type === 'currency'
		? `icon-${Data.current}`
		: 'icon-globe'
	
	let [reloadList, setReloadList] = useState(true)

	function toggleList(e) {
		script.toggleList(e, elems, classes)
	}
	const selectItem = useCallback((event) => {
		let value = script.selectItem(event, elems, Data)
		dispatch(dataTypes[type].action(value))
		setReloadList(true) // change list by useEffect with delay
		if (type === 'language') setReloadLanguage(true)
	}, [Data, dataTypes, type, dispatch])

	let customOptionList = useMemo(() => Data.list.map((item, index) => {
		if (item !== Data.current) return (
			<li className={classes.option} onClick={selectItem} key={index}>
				{item.toUpperCase()}
			</li>
		)
		else return null
	}), [Data, selectItem])

	useEffect(() => { //once
		script.setupWindowEvents(elems, classes)
	}, [])

	useEffect(() => {
		const transitionDelay = 300 // todo: use css variable
		setTimeout(() => {
			if (reloadLanguage) window.location.reload()
			if (reloadList) {
				setReloadList(false)
				elems.list.setChildren(customOptionList)
			}
		}, transitionDelay)
	})


	console.log('render Select');
	return (
		<div className={elems.select.className} ref={elems.select.ref} {...props}>
			<span className={elems.typeIcon.className} ref={elems.typeIcon.ref}>
				<Icon name={elems.typeIcon.iconName} />
			</span>
			<div className={elems.header.className} ref={elems.header.ref} onClick={toggleList}>
				<span className={elems.headerText.className} ref={elems.headerText.ref}>{elems.headerText.children}</span>
				<span className={elems.headerExpandIcon.className} ref={elems.headerExpandIcon.ref}>
					<Icon name='icon-arrow-short' />
				</span>
			</div>
			<div className={elems.listWrapper.className} ref={elems.listWrapper.ref} onClick={toggleList}>
				<ul className={elems.list.className} ref={elems.list.ref}>
					{elems.list.children}
				</ul>
			</div>
		</div>
	)
}

export default Select