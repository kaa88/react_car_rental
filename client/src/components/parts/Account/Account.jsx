import { memo, useEffect, useRef, useState } from 'react';
import classes from './Account.module.scss';
import Container from '../../ui/Container/Container';
import Image from '../../ui/Image/Image';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';
import TranslateHandler from '../../TranslateHandler';
import FetchService from '../../../services/FetchService';
import Loader from '../../ui/Loader/Loader';
import LoadError from '../../ui/Loader/LoadError';
import InputText from '../../ui/InputText/InputText';
import { useCustomElement } from '../../../hooks/useCustomElement';
import { jsMediaQueries } from '../../../utilities/jsMediaQueries';
import UserPhoto from '../../ui/UserPhoto/UserPhoto';


const Account = memo(function Account() {

	const activeSpoilersDefault = {
		history: false,
		settings: false,
	}
	let [activeSpoilers, setActiveSpoilers] = useState(activeSpoilersDefault)

	function toggleSpoiler(e, reset) {
		if (reset) return setActiveSpoilers(activeSpoilersDefault)
		let spoilerName = e.currentTarget.dataset.name
		let newActiveSpoilers = {...activeSpoilers}
		newActiveSpoilers[spoilerName] = newActiveSpoilers[spoilerName] ? false : true
		setActiveSpoilers(newActiveSpoilers)
	}

	useEffect(() => {
		jsMediaQueries.registerActions(480, [() => {toggleSpoiler(false, true)}])
	}, [])


	const getBookingItems = function() {
		return (
			<div className={classes.bookingItem}>
				{getReservationItem()}
				<div className={classes.bookingItemButtons}>
					<Button className={classes.bookingItemBtn}>?_Edit</Button>
					<Button className={classes.bookingItemBtn} modif='negative'>?_Cancel</Button>
				</div>
			</div>
		)
	}
	const getHistoryItems = function() {
		return (
			<div className={classes.historyItem}>
				{getReservationItem()}
				<button className={classes.historyItemDeleteBtn}>
					<Icon className={classes.bookingIcon} name='icon-bin' />
					<span>?_Delete</span>
				</button>
			</div>
		)
	}
	const getReservationItem = function(data) {
		return (
			<div className={classes.bookingInfoBox}>
				<div className={classes.bookingTitle}>{'carName'}</div>
				<div className={classes.bookingText}>
					<Icon className={classes.bookingIcon} name='icon-calendar' />
					<span>{'date'}</span>
				</div>
				<div className={classes.bookingText}>
					<Icon className={classes.bookingIcon} name='icon-point' />
					<span>{'location'}</span>
				</div>
				<div className={classes.bookingText}>
					<Icon className={classes.bookingIcon} name='icon-clock' />
					<span>{'time'}</span>
				</div>
				<div className={classes.bookingText}>
					<Icon className={classes.bookingIcon} name='icon-usd' />
					<span>{'price'}</span>
				</div>
			</div>
		)
	}

	return (
		<TranslateHandler>
			<section className={classes.account}>
				<Container className={classes.container}>
					<h3 className='fz36 color02 tac'>?_Account</h3>

					<div className={classes.box}>
						<div className={classes.booking}>
							<div className={classes.header}>?_Active booking</div>
							<div className={classes.content}>
								{getBookingItems()}
								{getBookingItems()}
								{getBookingItems()}
								{getBookingItems()}
								{getBookingItems()}
							</div>
						</div>
						<div className={classes.history}>
							<div className={classes.header}>
								<span>?_History</span>
								<div className={classes.spoilerButton} onClick={toggleSpoiler} data-name='history'>
									<Icon className={classes.spoilerIcon} name='icon-arrow-short' />
								</div>
							</div>
							<div className={`${classes.content} ${classes.spoilerContent} ${activeSpoilers.history ? classes.spoilerActive : ''}`}>
								{getHistoryItems()}
								{getHistoryItems()}
								{getHistoryItems()}
								{getHistoryItems()}
								{getHistoryItems()}
								{getHistoryItems()}
								{getHistoryItems()}
								{getHistoryItems()}
								{getHistoryItems()}
								{getHistoryItems()}
								<Button className={classes.historyMoreBtn} modif='negative'>?_Load more</Button>
							</div>
						</div>
						<div className={classes.settings}>
							<div className={classes.header}>
								<span>?_Settings</span>
								<div className={classes.spoilerButton} onClick={toggleSpoiler} data-name='settings'>
									<Icon className={classes.spoilerIcon} name='icon-arrow-short' />
								</div>
							</div>
							<div className={`${classes.content} ${classes.spoilerContent} ${activeSpoilers.settings ? classes.spoilerActive : ''}`}>
								<form className={classes.settingsForm} action="#">
									<InputText className={classes.settingsInput} placeholder='?_Name' />
									<InputText className={classes.settingsInput} placeholder='?_Last name' />
									<InputText className={classes.settingsInput} placeholder='?_Change password' />
									<Button className={classes.settingsPhotoButton} modif='negative'>?_+ Add photo</Button>
									<Button className={classes.settingsSubmitButton}>?_Save changes</Button>
								</form>
								<div className={classes.userPhotoBox}>
									<div className={classes.userPhoto}>
										<UserPhoto src='img/user_photos/b2g.jpg' />
									</div>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>
		</TranslateHandler>
	)
})

export default Account