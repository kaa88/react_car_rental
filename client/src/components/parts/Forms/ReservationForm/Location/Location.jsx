import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../../../../store/slices/reservationFormSlice';
import {getCssVariable} from '../../../../../utilities/utilities';
import script from './Location.script';
import classes from './Location.module.scss';
import TranslateHandler from '../../../../TranslateHandler';
import Popup from '../../../../ui/Popup/Popup';
import Icon from '../../../../ui/Icon/Icon';

/* TODO:
	translate
*/

const Location = memo(function Location({
	className = '',
	activeDataType = '',
	setActiveDataType = function(event, value){},
	...props
}) {

	const dispatch = useDispatch()
	function setFormData(value) {
		dispatch(setLocation(value))
	}

	const dataType = 'location'

	useEffect(() => {
		script.init({setInputValue})
		setFormData(defaultInputValue)
	}, [])

	const defaultInputValue = script.getSearchList()[0]
	let [inputValue, setInputValue] = useState(defaultInputValue)
	let [searchList, setSearchList] = useState(script.getSearchList())


	const handleInputClick = function(e){
		setActiveDataType(e, dataType)
	}

	const handleInputChange = function(e){
		if (!activeDataType) setActiveDataType(e, dataType)
		setInputValue(e.target.value)
		setSearchList(script.filterSearchList(e.target.value))
		setFormData('')
	}

	const handleSearchSelect = function(e){
		let value = e.target.textContent
		setInputValue(value)
		setFormData(value)
		setActiveDataType(e, '')

		const transitionDelay = getCssVariable('timer-popup')*1000
		setTimeout(() => {
			setSearchList(script.getSearchList())
		}, transitionDelay);
	}

	const getSearchListItems = function() {
		return ( searchList.map((item, index) =>
			<div className={classes.searchListItem} onClick={handleSearchSelect} key={index}>
				{item}
			</div>
		))
	}

	// console.log('render Location');
	return (
		<TranslateHandler>
			<div className={`${className} ${classes.wrapper}`}>
				<p className={classes.title}>?_Location</p>
				<div className={classes.inputBox}>
					<input
						className={`${classes.input} ${dataType === activeDataType ? classes.active : ''}`}
						type="text"
						value={inputValue}
						onClick={handleInputClick}
						onChange={handleInputChange}
						autoComplete="off"
					/>
					<div className={classes.iconBox}>
						<Icon name='icon-search' />
					</div>
				</div>
				<Popup className={classes.popup} name={dataType} modif='noCloseButton'>
					<div className={classes.popupContent}>
						<div className={classes.searchList}>
							{getSearchListItems()}
						</div>
					</div>
				</Popup>
			</div>
		</TranslateHandler>
	)
})

export default Location