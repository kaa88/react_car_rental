import React, { useState, memo, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useCustomElement } from '../../../../hooks/useCustomElement';
import script from './HeaderMenu.script';
import classes from './HeaderMenu.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Icon from '../../../ui/Icon/Icon';

const headerMenuParams = {
	hideOnViewChangе: true, // by default menu disappears when window switches between mobile and desktop view, it prevents css transition blinking; if you want to turn it off in some reasons, set 'false' (default = true)
}

const HeaderMenu = memo(function HeaderMenu({className = '', ...props}) {

	const dispatch = useDispatch()
	const menuIsActive = useSelector(state => state.header.menuIsActive)
	const activeClass = menuIsActive ? classes.active : ''

	const breakpointStore = useSelector(state => state.mobileBreakpoint)
	const languageStore = useSelector(state => state.language.current)

	const hideWrapper = useCustomElement(classes.hideWrapper)
	const menu = useCustomElement(classes.menu)
	const turnoffArea = useCustomElement(classes.turnoffArea)

	const getActualElems = useCallback(function() {
		return {wrapper: hideWrapper, menu, menuIsActive}
	}, [menuIsActive])
	
	// Убрать getActualElems, т.к. данные старые в замыкании... хотя вроде бы что-то работает (stageL...)

	const openMenu = function() {
		script.openMenu()
	}
	const closeMenu = function() {
		script.closeMenu()
	}
	const closeMenuFromOutside = function() {
		let event = new Event('click')
		turnoffArea.el.dispatchEvent(event)
	}
	
	useEffect(() => {
		script.init({headerMenuParams, classes, breakpointStore, languageStore, dispatch, getActualElems, closeMenuFromOutside})
		return () => script.destroy()
	}, [])

	useEffect(() => {
		script.resetShrinkStateOnLanguageChange(languageStore)
	}, [languageStore])


	const menuLinks = [
		{ name: 'Cars',				href: '#' },
		{ name: 'Feedback',			href: '#' },
		{ name: 'F.A.Q',				href: '#' },
		{ name: 'How to rent',		href: '#' },
	]

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.headerMenu} ${activeClass}`}>

				<div className={classes.buttonBox}>
					<div className={classes.openBtn} onClick={openMenu}>
						<Icon name='icon-menu' />
					</div>
					<div className={classes.closeBtn} onClick={closeMenu}>
						<Icon name='icon-cross' />
					</div>
				</div>

				<div className={turnoffArea.className} onClick={closeMenu} ref={turnoffArea.ref}></div>

				<div className={hideWrapper.className} ref={hideWrapper.ref}>
					<nav className={menu.className} ref={menu.ref}>
						<ul className={classes.menuItems}>
							{menuLinks.map((item, index) =>
								<li className={classes.menuItem} key={index}>
									<a className={classes.menuLink} href={item.href}>{`?_${item.name}`}</a>
								</li>
							)}
						</ul>
					</nav>
				</div>

			</div>

		</TranslateHandler>
	)
})

export default HeaderMenu
