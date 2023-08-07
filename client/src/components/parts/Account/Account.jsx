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
import { useSelector } from 'react-redux';
import SettingsForm from '../Forms/AccountForm/SettingsForm';
import ReservationService from '../../../services/ReservationService';
import PeriodScript from '../Forms/ReservationForm/Period/Period.script'
import { useFetching } from '../../../hooks/useFetching';


const Account = memo(function Account() {

	// Spoilers
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
	//end Spoilers


	let [reservations, setReservations] = useState([])
	let [fetchData, dataIsLoading, loadingError] = useFetching(getReservations)

	useEffect(() => {
		jsMediaQueries.registerActions(480, [() => {toggleSpoiler(false, true)}])
		fetchData()
	}, [])


	async function getReservations() {
		let response = await ReservationService.getReservation()
		if (response.ok) setReservations(response.data)
	}
	async function cancelActiveBooking(e) {
		let isConfirmed = window.confirm('Are you sure you want to cancel reservation?')
		if (isConfirmed) {
			await ReservationService.setReservationInactive(e.currentTarget.dataset.id)
			fetchData()
		}
	}
	async function deleteHistoryItem(e) {
		let isConfirmed = window.confirm('Are you sure you want to delete reservation?')
		if (isConfirmed) {
			await ReservationService.deleteReservation(e.currentTarget.dataset.id)
			fetchData()
		}
	}
	const getBookingItem = function(reservation) {
		return (
			<div className={classes.bookingItem} key={reservation.id}>
				{getReservationItem(reservation)}
				<div className={classes.bookingItemButtons}>
					<Button className={classes.bookingItemBtn}>?_Edit</Button>
					<Button
						className={classes.bookingItemBtn}
						modif='negative'
						data-id={reservation.id}
						onClick={cancelActiveBooking}
					>?_Cancel</Button>
				</div>
			</div>
		)
	}
	const getHistoryItem = function(reservation) {
		return (
			<div className={classes.historyItem} key={reservation.id}>
				{getReservationItem(reservation)}
				<button className={classes.historyItemDeleteBtn} data-id={reservation.id} onClick={deleteHistoryItem}>
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
					<span>{`${PeriodScript.getStringifiedDate(data.pickupDate)} - ${PeriodScript.getStringifiedDate(data.returnDate)}`}</span>
				</div>
				<div className={classes.bookingText}>
					<Icon className={classes.bookingIcon} name='icon-point' />
					<span>{data.location}</span>
				</div>
				<div className={classes.bookingText}>
					<Icon className={classes.bookingIcon} name='icon-clock' />
					<span>{PeriodScript.getStringifiedTime(data.pickupDate)}</span>
				</div>
				<div className={classes.bookingText}>
					<Icon className={classes.bookingIcon} name='icon-usd' />
					<span>{data.price}</span>
				</div>
			</div>
		)
	}

	const bookingItems = []
	const historyItems = []
	reservations.forEach(item => {
		if (!item.isInactive) bookingItems.push(getBookingItem(item))
		else historyItems.push(getHistoryItem(item))
	})

	return (
		<TranslateHandler>
			<section className={classes.account}>
				<Container className={classes.container}>
					<h3 className='fz36 color02 tac'>?_Account</h3>

					<div className={classes.box}>
						<div className={classes.booking}>
							<div className={classes.header}>?_Active booking</div>
							<div className={classes.content}>
								{dataIsLoading && <Loader className={classes.loader} />}
								{bookingItems}
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
								{dataIsLoading && <Loader className={classes.loader} />}
								{historyItems}
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
								<SettingsForm />
							</div>
						</div>
					</div>
				</Container>
			</section>
		</TranslateHandler>
	)
})

export default Account