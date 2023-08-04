import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import classes from './HeaderAccount.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import Divider from '../../../ui/Divider/Divider';
import OptionsSelect from '../../../ui/OptionsSelect/OptionsSelect';
import ModalLink from '../../../ui/Modal/ModalLink'
import Popup from '../../../ui/Popup/Popup';
import { setActivePopup } from '../../../../store/slices/popupSlice';
import UserService from '../../../../services/UserService';
import UserPhoto from '../../../ui/UserPhoto/UserPhoto';
import { Link } from 'react-router-dom';

const IMAGE_DIR = process.env.REACT_APP_USER_PHOTOS_DIR


const HeaderAccount = memo(function HeaderAccount({className = ''}) {

	const dispatch = useDispatch()

	const userData = useSelector(state => state.user)
	const userID = userData ? userData.id : ''
	const userName = userData ? userData.name : 'user'
	const userPhoto = userData ? userData.image : ''
	const userIsActivated = userData ? userData.isActivated : false
	const noDisplayStyle = {display: 'none'}

	const activePopup = useSelector(state => state.popup.active)
	const popupName = 'usernav'


	const handleProfileClick = function(e) {
		e.stopPropagation()
		let active = activePopup === popupName ? '' : popupName
		dispatch(setActivePopup(active))
	}

	const logout = async function() {
		let response = await UserService.logout()
		if (response.ok) {
			dispatch(setActivePopup(''))
		}
	}

	const activateAccount = async function() {

	}

	const closePopup = function() {
		dispatch(setActivePopup(''))
	}

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.account}`}>
				<Divider modif='dark' className={classes.divider} />
				<OptionsSelect type='currency' />
				<OptionsSelect type='language' />

				<div className={classes.userNav}>
					<ModalLink name='login'>
						<Button className={classes.signinButton} modif='negative' style={!!userID ? noDisplayStyle : {}}>?_Sign in</Button>
					</ModalLink>
					<button
						className={classes.profileButton}
						onClick={handleProfileClick}
						title={userName}
						style={!!userID ? {} : noDisplayStyle}
					>
						<UserPhoto className={classes.userPhoto} src={`${IMAGE_DIR}/${userPhoto}`} />
					</button>
					<Popup className={classes.popup} name={popupName}>
						<div className={classes.popupContent}>
							<Link to='/account' onClick={closePopup}>
								<Button className={classes.popupButton}>?_Account</Button>
							</Link>
							{userIsActivated && <Button className={classes.popupButton} modif='negative' onClick={activateAccount}>?_Activate</Button>}
							<Button className={classes.popupButton} modif='negative' onClick={logout}>?_Sign out</Button>
						</div>
					</Popup>
				</div>
			</div>
		</TranslateHandler>
	)
})

export default HeaderAccount
