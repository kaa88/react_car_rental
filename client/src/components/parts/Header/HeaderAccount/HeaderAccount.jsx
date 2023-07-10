import React, { useState, memo, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useCustomElement } from '../../../../hooks/useCustomElement';
// import script from './HeaderAccount.script';
import classes from './HeaderAccount.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import Divider from '../../../ui/Divider/Divider';
import OptionsSelect from '../../../ui/OptionsSelect/OptionsSelect';
import ModalLink from '../../../ui/Modal/ModalLink'
import Icon from '../../../ui/Icon/Icon';
import Popup from '../../../ui/Popup/Popup';
import { setActivePopup } from '../../../../store/reducers/popupReducer';


const HeaderAccount = memo(function HeaderAccount({className = ''}) {

	const isLoggedIn = true
	const noDisplayStyle = {display: 'none'}
	const userName = 'abcd@mail.com'

	const dispatch = useDispatch()
	const activePopup = useSelector(state => state.popup.active)
	const popupName = 'usernav'





	let obj = {
		name: 'name'
	}
	let id = Symbol("id")
	obj[id] = 'surname'
	console.log(obj);






	const handleProfileClick = function(e) {
		e.stopPropagation()
		let active = activePopup === popupName ? '' : popupName
		dispatch(setActivePopup(active))
	}

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.account}`}>
				<Divider modif='dark' className={classes.divider} />
				<OptionsSelect type='currency' />
				<OptionsSelect type='language' />

				<div className={classes.userNav}>
					<ModalLink name='signin'>
						<Button className={classes.signinButton} modif='negative' style={isLoggedIn ? noDisplayStyle : {}}>?_Sign in</Button>
					</ModalLink>
					<button
						className={classes.profileButton}
						onClick={handleProfileClick}
						title={userName}
						style={isLoggedIn ? {} : noDisplayStyle}
					>
						<Icon name='icon-user' />
					</button>
					<Popup className={classes.popup} name={popupName}>
						<div className={classes.popupContent}>
							<Button className={classes.popupButton}>?_Account</Button>
							<Button className={classes.popupButton} modif='negative'>?_Sign out</Button>
						</div>
					</Popup>
				</div>
			</div>
		</TranslateHandler>
	)
})

export default HeaderAccount
