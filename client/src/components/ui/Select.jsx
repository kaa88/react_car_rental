import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {changeCurrency} from '../../store/reducers/currencyReducer'
import classes from './Select.module.css';
import Icon from './Icon';
import activeState from '../script/activeState';
import { useCustomElement } from '../../hooks/useCustomElement';
import { Language } from '../script/translate';

function Select({
	modif = 'select',
	type,
	className = '',
	children,
	...props
}) {
	const Currency = useSelector(state => state.currency)
	const dispatch = useDispatch()

	
	const dataTypes = {
		language: Language,
		currency: Currency
	}
	const Data = dataTypes[type]

	let [reloadLanguage, setReloadLanguage] = useState(false)

	const select = useCustomElement(`${className} ${classes[modif]}`)
	const header = useCustomElement(classes.header)
	const headerText = useCustomElement(classes.headerText, Data.current.toUpperCase())
	const headerTypeIcon = useCustomElement(classes.headerTypeIcon)
	const headerExpandIcon = useCustomElement(classes.headerExpandIcon)
	const listWrapper = useCustomElement(classes.listWrapper)
	const list = useCustomElement(classes.list, getCustomOptionList())

	const typeIcon = type === 'currency'
		? `icon-${headerText.children.toLowerCase()}`
		: 'icon-globe'

	function getCustomOptionList() {
		return Data.list.map((item, index) => {
			let selected = item === Data.current ? classes.selected : ''
			return (
				<li className={`${classes.option} ${selected}`} onClick={selectItem} key={index}>
					{item.toUpperCase()}
				</li>
			)
		})
	}

	useEffect(() => {
		if (reloadLanguage) setTimeout(() => {
			window.location.reload()
		}, 200)
	})
	useEffect(() => { //once
		window.addEventListener('click', toggleList)
		window.addEventListener('resize', toggleList)
	}, [])

	function toggleList(e) {
		function open() {
			activeState.add(listWrapper, classes.active)
			listWrapper.el.style.height = listWrapper.el.children[0].offsetHeight + 'px'
		}
		function close() {
			activeState.remove(listWrapper, classes.active)
			listWrapper.el.style.height = ''
		}
		e.stopPropagation()

		if (e.currentTarget.parentElement !== select.el) console.log('ksdjfa'); //close() // не работает это
		if (e.currentTarget === window) return close()

		if (activeState.check(listWrapper, classes.active)) close()
		else open()

	}

	// сделать список без повторов, т.е. перемещать пункт из листа в хедер (см. макет)

	function selectItem(e) {
		if (Data.current === e.target.innerHTML.toLowerCase()) return;
		Data.set(e.target.innerHTML)
		if (type === 'language') setReloadLanguage(true)
		if (type === 'currency') dispatch(changeCurrency(e.target.innerHTML.toLowerCase()))

		let newList = list.children.map(item => {
			let className = (item.props.children === e.target.innerHTML)
				? activeState.add(item.props.className, classes.selected)
				: activeState.remove(item.props.className, classes.selected)
			return React.cloneElement(item, {className})
		})
		list.setChildren(newList)
		headerText.setChildren(e.target.innerHTML)
	}

	return (
		<div className={select.className} ref={select.ref}>
			<div className={header.className} ref={header.ref} onClick={toggleList}>
				<span className={headerTypeIcon.className} ref={headerTypeIcon.ref}>
					<Icon name={typeIcon} />
				</span>
				<span className={headerText.className} ref={headerText.ref}>{headerText.children}</span>
				<span className={headerExpandIcon.className} ref={headerExpandIcon.ref}>
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
}

export default Select