import React, { memo, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import script from './Header.script';
import classes from './Header.module.scss';
import TranslateHandler from '../../TranslateHandler';
import Container from '../../ui/Container/Container';
import Logo from '../../ui/Logo/Logo';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import HeaderAccount from './HeaderAccount/HeaderAccount';

const headerParams = {
	headerPositionFixed: true, // choose if header is 'static' (false) or 'fixed' (true) on window, it controls CSS 'position' prop (default = false)
	hidingHeader: true, // add hidingHeader part (default = false) (works if headerPositionFixed: true)
	hidingHeaderView: 'any', // choose in what viewports 'hidingHeader' will work: 'mobile', 'desktop' or 'any' (default = 'any') (works if hidingHeader: true)
	hiddenPositionOffset: 5, // for 'hidingHeader', set up this if you want to move header by value (in px) that differs it's height (default = 0)
	compactMode: true, // adds 'compact' class to the header when you scroll page for some distance (default = false) (works if headerPositionFixed: true)
	compactModeThreshold: 100, // for 'hidingHeaderCompactMode', set the distance (in px) when 'compact mode' triggers (default = 100)
	resetCompactMode: false, // reset on view change or page reload (default = true)
}

const Header = memo(function Header() {
	const breakpoints = useSelector(state => state.mobileBreakpoint)
	const dispatch = useDispatch()
	
	const {menuIsActive, headerIsCompact, headerIsSharing} = useSelector(state => state.header)
	const classNameParts = [classes.header]
	classNameParts.push(headerParams.headerPositionFixed ? classes.fixed : classes.static)
	classNameParts.push(menuIsActive ? classes.active : '')
	classNameParts.push(headerIsCompact ? classes.compact : '')
	classNameParts.push(headerIsSharing ? classes.sharing : '')
	const className = classNameParts.filter(item => item).join(' ')

	const headerRef = useRef()

	useEffect(() => {
		script.init({headerParams, classes, headerEl: headerRef.current, breakpoints, dispatch})
		return () => script.destroy()
	}, [])

	useEffect(() => {
		if (menuIsActive) script.scrollIntoView()
	}, [menuIsActive])

	return (
		<TranslateHandler>
			<header className={className} ref={headerRef}>

				<div className={classes.level}>
					<Container className={classes.container} modif='flex'>
						<Logo className={classes.logo} />
						<HeaderMenu className={classes.menu} />
						<HeaderAccount />
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
