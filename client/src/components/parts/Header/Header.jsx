import React, { useState, memo, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useCustomElement } from '../../../hooks/useCustomElement';
import script from './Header.script';
import classes from './Header.module.scss';
import TranslateHandler from '../../TranslateHandler';
import Container from '../../ui/Container/Container';
import Button from '../../ui/Button/Button';
import Divider from '../../ui/Divider/Divider';
import Logo from '../../ui/Logo/Logo';
// import Select from '../../ui/Select/Select';
import Icon from '../../ui/Icon/Icon';
import OptionsSelect from '../../ui/OptionsSelect/OptionsSelect';
import ModalLink from '../../ui/Modal/ModalLink'


export const headerDefaultState = {
	headerIsInitialized: false,
	headerIsCompact: false,
	headerIsSharing: false,
	headerIsFixed: false,
	menuIsActive: false,
	returnHeader: function(){}
}

export let actualElems = {} // this var allows scripts to have updated CustomElements

const Header = memo(function Header({
	className = '',
	...props
}) {
	const headerParams = {
		menu: true, // - add menu part (default = false)
		headerPositionFixed: true, // - choose if header is 'static' (false) or 'fixed' (true) on window, it controls CSS 'position' prop (default = false)
		hidingHeader: true, // - add hidingHeader part (default = false) (works if headerPositionFixed: true)
		hidingHeaderView: 'any', // - choose in what viewports 'hidingHeader' will work: 'mobile', 'desktop' or 'any' (default = 'any') (works if hidingHeader: true)
		hiddenPositionOffset: 5, // - for 'hidingHeader', set up this if you want to move header by value (in px) that differs it's height (default = 0)
		compactMode: true, // - adds 'compact' class to the header when you scroll page for some distance (default = false) (works if headerPositionFixed: true)
		compactModeThreshold: 100, // - for 'hidingHeaderCompactMode', set the distance (in px) when 'compact mode' triggers (default = 100)
		resetCompactMode: false, // reset on view change or page reload (default = true)
		hideOnViewChangе: true, // - by default menu disappears when window switches between mobile and desktop view, it prevents css transition blinking; if you want to turn it off in some reasons, set 'false' (default = true)
	}
	const header = useCustomElement(`${className} ${classes.header} ${classes.header_static}`)
	// menuTurnoffArea: useCustomElement(classes.menuTurnoffArea),
	// level: useCustomElement(classes.level),
	// container: useCustomElement(classes.container),
	// menuOpenBtn: useCustomElement(classes.menuOpenBtn),
	// menuCloseBtn: useCustomElement(classes.menuCloseBtn),
	const menuHideWrapper = useCustomElement(classes.menuHideWrapper)
	const menu = useCustomElement(classes.menu)
	// menuItem: useCustomElement(classes.menuItem),
	// menuLink: useCustomElement(classes.menuLink),
	// accountButton: useCustomElement(classes.accountButton),
	actualElems = {
		header,
		menuHideWrapper,
		menu,
	}

	const breakpointStore = useSelector(state => state.mobileBreakpoint)
	const languageStore = useSelector(state => state.language)

	useEffect(() => {
		script.init({headerParams, classes, header, breakpointStore, languageStore})
	}, [])
	useEffect(() => {
		script.menu.checkLanguage(languageStore.current)
	})

	function toggleMenu(event) {
		script.menu.toggleMenu(event)
	}

	const menuLinks = [
		{ name: 'Cars',				href: '#' },
		{ name: 'Feedback',			href: '#' },
		{ name: 'F.A.Q',				href: '#' },
		{ name: 'How to rent',		href: '#' },
	]
	// console.log('render Header')
	return (
		<TranslateHandler>
			<header className={header.className} ref={header.ref} {...props}>
				<div className={classes.menuTurnoffArea} onClick={toggleMenu}></div>

				<div className={classes.level}>
					<Container className={classes.container} modif='flex'>
						<Logo className={classes.logo} />

						<div className={menuHideWrapper.className} ref={menuHideWrapper.ref}>
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

						<div className={classes.account}>
							<div className={classes.buttonBox}>
								<div className={classes.menuOpenBtn} onClick={toggleMenu}>
									<Icon name='icon-menu' />
								</div>
								<div className={classes.menuCloseBtn} onClick={toggleMenu}>
									<Icon name='icon-cross' />
								</div>
							</div>
							<Divider modif='dark' className={classes.divider} />
							{/* <Select type='currency'></Select> */}
							<OptionsSelect type='currency' />
							<OptionsSelect type='language' />
							{/* <Select type='language'></Select> */}
							<ModalLink name='signin'>
								<Button className={classes.accountButton} modif='negative'>?_Sign in</Button>
							</ModalLink>
						</div>

						{/* <!-- script will add current page href if print-address tag is empty --> */}
						<div className={classes.printAddress}></div>
						<div className={classes.printAddressQr}></div>

					</Container>
				</div>

			</header>
		</TranslateHandler>
	)
})

export default Header
