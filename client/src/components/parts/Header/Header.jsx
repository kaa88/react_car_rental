import React, { useState, memo, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import script from './Header.script';
import { headerMetrics, menuWidth } from './HeaderMetrics';
import classes from './Header.module.scss';
import {Translate} from '../../../script/translate';
import Container from '../../ui/Container/Container';
import Button from '../../ui/Button/Button';
import Divider from '../../ui/Divider/Divider';
import Logo from '../../ui/Logo/Logo';
import Select from '../../ui/Select/Select';
import Icon from '../../ui/Icon/Icon';

import { useCustomElement } from '../../../hooks/useCustomElement';
import activeState from '../../../script/activeState';


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

	useEffect(() => {
		headerMetrics.init(header, metricsStore, dispatch, setHeaderStyle)
		menuWidth.init(menuHideWrapper, menu, classes)
	}, [])

	// useEffect(() => {
	// 	metrics.calcHeaderHeight(metricsStore)
	// })

	function toggleMenu(e) {
		script.toggleMenu(e, {header}, classes)
	}

	console.log('render Header')
	return (
		<Translate>
			<header className={header.className} ref={header.ref} style={headerStyle}>
				<div className={classes.menuTurnoffArea} onClick={toggleMenu}></div>

				<div className={`${classes.level} scroll-lock-item-p`}> {/* scroll??? */}
					<Container className={classes.container} modif='flex'>
						<Logo className={classes.logo} />

						<div className={classes.menuHideWrapper} ref={menuHideWrapper.ref}>
							<nav className={`${menu.className} scroll-lock-item-pm`} ref={menu.ref}>
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
