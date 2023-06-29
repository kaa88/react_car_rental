import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePopup } from '../../../../../store/reducers/formPopupReducer';
import script from './Location.script';
import classes from './Location.module.scss';
import Popup from '../../../../ui/Popup/Popup';
import Icon from '../../../../ui/Icon/Icon';
// import TranslateHandler from '../../../../TranslateHandler';
// import { useCustomElement } from '../../../hooks/useCustomElement';
// import InputText from '../../ui/InputText/InputText';

const Location = memo(function Location({className, ...props}) {
	// script.init()
	const dataType = 'location'

	const dispatch = useDispatch()
	useEffect(() => {
		window.addEventListener('click', toggleActiveDataType)
		return () => window.removeEventListener('click', toggleActiveDataType)
	}, [])

	const toggleActiveDataType = function(e) {
		e.stopPropagation()
		let active = e.currentTarget === window ? '' : e.target.dataset.name
		dispatch(setActivePopup(dataType))
	}


	const handleInputClick = function(e){
		console.log('input click');
		toggleActiveDataType(e)
	}

	const handleInputChange = function(e){
		console.log('input change');
		
	}

	const handleSearchSelect = function(e){
		console.log('search select');
		
	}


	let searchList = script.getSearchList()
	console.log(searchList);

	const getSearchListItems = function() {
		return ( searchList.map((item, index) =>
			<div className={classes.searchListItem} onClick={handleSearchSelect} key={index}>
				{item}
			</div>
		))
	}

	// console.log('render Location');
	return (
		<div className={classes.wrapper}>
			<input className={classes.input} type="text" onClick={handleInputClick} onChange={handleInputChange} />
			<div className={classes.iconBox}>
				<Icon name='icon-search' size={24} />
			</div>
			<Popup name={dataType}>
				<div className={classes.searchList}>
					{getSearchListItems()}
				</div>
			</Popup>
		</div>
	)
})

export default Location