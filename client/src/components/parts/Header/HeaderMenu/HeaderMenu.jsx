import React, { memo, useEffect } from 'react';
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

	script.dispatch = useDispatch()
	script.breakpoints = useSelector(state => state.mobileBreakpoint)
	const language = useSelector(state => state.language.current)

	script.menuIsActive = useSelector(state => state.header.menuIsActive)
	const activeClass = script.menuIsActive ? classes.active : ''

	script.elems.hideWrapper = useCustomElement(classes.hideWrapper)
	script.elems.menu = useCustomElement(classes.menu)

	const openMenu = function() {
		script.openMenu()
	}
	const closeMenu = function() {
		script.closeMenu()
	}
	
	useEffect(() => {
		script.init(headerMenuParams, classes)
		return () => script.destroy()
	}, [])

	useEffect(() => {
		script.resetShrinkStateOnLanguageChange(language)
	}, [language])


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

				<div className={classes.turnoffArea} onClick={closeMenu}></div>

				<div className={script.elems.hideWrapper.className} ref={script.elems.hideWrapper.ref}>
					<nav className={script.elems.menu.className} ref={script.elems.menu.ref}>
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
