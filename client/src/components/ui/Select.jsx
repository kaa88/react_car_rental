import React, { useEffect, useState } from 'react';
import classes from './Select.module.css';
import Icon from './Icon';
import activeState from '../script/activeState';
import { useCustomElement } from '../../hooks/useCustomElement';
import { Language } from '../script/translate';
import { Currency } from '../script/currency';

function Select({
	modif = 'select',
	type,
	className = '',
	icon = '',
	children,
	...props
}) {
	
	const dataTypes = {
		language: Language,
		currency: Currency
	}
	const Data = dataTypes[type]

	let [reloadLanguage, setReloadLanguage] = useState(false)

	const select = useCustomElement(`${className} ${classes[modif]}`)
	const header = useCustomElement(classes.header)
	const headerText = useCustomElement(classes.headerText, Data.current.toUpperCase())
	const headerIcon = useCustomElement(classes.headerIcon)
	const listWrapper = useCustomElement(classes.listWrapper)
	const list = useCustomElement(classes.list, getCustomOptionList())

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
		if (e.currentTarget === window) return close()

		if (activeState.check(listWrapper, classes.active)) close()
		else open()
	}

	function selectItem(e) {
		if (Data.current === e.target.innerHTML.toLowerCase()) return console.log('hahaha');;
		Data.set(e.target.innerHTML)
		if (type === 'language') setReloadLanguage(true)

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
		<div className={select.className}>
			<div className={header.className} ref={header.ref} onClick={toggleList}>
				<span className={headerText.className} ref={headerText.ref}>{headerText.children}</span>
				<span className={headerIcon.className} ref={headerIcon.ref}>
					<Icon name={icon} />
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