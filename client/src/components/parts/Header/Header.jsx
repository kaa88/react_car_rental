import React, { useState, memo, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useCustomElement } from '../../../hooks/useCustomElement';
import script from './Header.script';
import classes from './Header.module.scss';
import { Translate } from '../../../script/translate';
import Container from '../../ui/Container/Container';
import Button from '../../ui/Button/Button';
import Divider from '../../ui/Divider/Divider';
import Logo from '../../ui/Logo/Logo';
import Select from '../../ui/Select/Select';
import Icon from '../../ui/Icon/Icon';
import { jsMediaQueries } from '../../../script/jsMediaQueries'



const Header = memo(function({
	modif = 'static',
	className = '',
	...props
}) {
	modif = 'header_' + modif

	const menuLinks = [
		{ name: 'Cars',				href: '#' },
		{ name: 'Feedback',			href: '#' },
		{ name: 'F.A.Q',				href: '#' },
		{ name: 'How to rent',		href: '#' },
	]

	const dispatch = useDispatch()
	const metricsStore = useSelector(state => state.headerMetrics)
	const breakpointStore = useSelector(state => state.mobileBreakpoint)

	const header = useCustomElement(`${classes.header} ${classes[modif]}`)
	let [headerStyle, setHeaderStyle] = useState({})
	// menuTurnoffArea: useCustomElement(classes.menuTurnoffArea),
	// level: useCustomElement(classes.level),
	// container: useCustomElement(classes.container),
	// menuOpenBtn: useCustomElement(classes.menuOpenBtn),
	// menuCloseBtn: useCustomElement(classes.menuCloseBtn),
	const menuHideWrapper = useCustomElement(classes.menuHideWrapper)
	const menu = useCustomElement(classes.menu)
	// let [menuWidthClass, setMenuWidthClass] = useState('')
	// menuItem: useCustomElement(classes.menuItem),
	// menuLink: useCustomElement(classes.menuLink),
	// accountButton: useCustomElement(classes.accountButton),
	// console.log(header);
	// console.log(menu);

	// Metrics
	// const metricsDefaultValue = [0, 0]
	// const metricsHeaderHeightState = useState(metricsDefaultValue)
	// const metricsHeaderPositiontState = useState(metricsDefaultValue)
	// const metricsWindowHeightState = useState(metricsDefaultValue)
	// metrics.init([
	// 	metricsHeaderHeightState,
	// 	metricsHeaderPositiontState,
	// 	metricsWindowHeightState,
	// ], header.el)
	// console.log(metrics);

	const headerParams = {
		menu: true, // - add menu part (default = false)
		menuTimeout: 500,
		headerPositionFixed: true, // - choose if header is 'static' (false) or 'fixed' (true) on window, it controls CSS 'position' prop (default = false)
		hidingHeader: true, // - add hidingHeader part (default = false) (works if headerPositionFixed: true)
		hidingHeaderView: 'both', // - choose in what viewports 'hidingHeader' will work: 'mobile', 'desktop' or 'both' (default = 'both') (works if hidingHeader: true)
		hiddenPositionOffset: 0, // - for 'hidingHeader', set up this if you want to move header by value (in px) that differs it's height (default = 0)
		hidingHeaderCompactMode: true, // - adds 'compact' class to the header when you scroll page for some distance (default = false) (works if headerPositionFixed: true)
		compactModeThreshold: 100, // - for 'hidingHeaderCompactMode', set the distance (in px) when 'compact mode' triggers (default = 100)
		hideOnViewChangе: true, // - by default menu disappears when window switches between mobile and desktop view, it prevents css transition blinking; if you want to turn it off in some reasons, set 'false' (default = true)
		// onMenuOpen, onMenuClose, // - event function(timeout){}
	}

	useEffect(() => {
		// console.log(header.classList.remove('wow')); 
		// console.log(classNameChanger.contains('wow','wo hello world'));
		
		script.init({headerParams, classes, header, menuHideWrapper, menu, metricsStore, breakpointStore, dispatch, setHeaderStyle})

		// headerMetrics.init(header, setHeaderStyle)
		// menuWidth.init(menuHideWrapper, menu, classes)
	}, [])

	// useEffect(() => {
	// 	console.log('registerAction');
	// })

	function toggleMenu(e) {
		script.menu.toggleMenu(e, header)
	}

	// console.log('render Header')
	return (
		<Translate>
			<header className={header.className} ref={header.ref} style={headerStyle}>
				<div className={classes.menuTurnoffArea} onClick={toggleMenu}></div>

				<div className={`${classes.level} scroll-lock-item-p`}> {/* scroll??? */}
					<Container className={classes.container} modif='flex'>
						<Logo className={classes.logo} />

						<div className={classes.menuHideWrapper} ref={menuHideWrapper.ref}>
							<nav className={`${menu.className} scroll-lock-item-p`} ref={menu.ref}>
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
							<Select type='currency'></Select>
							<Select type='language'></Select>
							<Button className={classes.accountButton} modif='negative'>?_Sign in</Button>
						</div>

						{/* <!-- script will add current page href if print-address tag is empty --> */}
						<div className={classes.printAddress}></div>
						<div className={classes.printAddressQr}></div>

					</Container>
				</div>

			</header>
		</Translate>
	)
})

export default Header



// function Header() {
// 	return (
// 		<Translate>
// 			<header className={classes.header}>
// 				<Container modif='flex'>
// 					<Logo style={{fontSize: '20px'}}></Logo>
// 					<div className={classes.menu}>
// 						<nav className={classes.pages}>
// 							<div className={classes.item}>
// 								<Link>?_Cars</Link>
// 							</div>
// 							<div className={classes.item}>
// 								<Link>?_Feedback</Link>
// 							</div>
// 							<div className={classes.item}>
// 								<Link>?_F.A.Q</Link>
// 							</div>
// 							<div className={classes.item}>
// 								<Link>?_How to rent</Link>
// 							</div>
// 						</nav>
// 						<div className={classes.account}>
// 							<Divider style={{backgroundColor: 'rgba(50,2,2,0.5)'}} />
// 							<Select type='currency'></Select>
// 							<Select type='language'></Select>
// 							<Button className={classes.button} modif='negative'>?_Sign in</Button>
// 						</div>
// 					</div>
// 				</Container>
// 			</header>
// 		</Translate>
// 	)
// }
