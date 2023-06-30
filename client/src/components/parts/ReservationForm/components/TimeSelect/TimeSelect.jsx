import { memo, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import classes from './TimeSelect.module.scss';
import script from './TimeSelect.script';
import parentScript from '../Period/Period.script';
import TranslateHandler from '../../../../TranslateHandler';
import Popup from '../../../../ui/Popup/Popup';
import Divider from '../../../../ui/Divider/Divider';

const TimeSelect = memo(function TimeSelect({
	className = '',
	dataType,
	period,
	onSelect = function(){},
	...props
}) {
	script.init(parentScript)
	const activePopup = useSelector(state => state.formPopup.activePopup)
	const wrapperElem = useRef()
	const activeTimeElem = useRef()
	const inactiveTimeElem = useRef()

	const scrollTimeList = function(){
		if (!activeTimeElem.current) return;
		const elemsInRow = 2
		const offset = 3
		const scrollDistance = activeTimeElem.current.offsetHeight * (activeTimeElem.current.dataset.scrollIndex / elemsInRow - offset)
		wrapperElem.current.scrollTo(0, scrollDistance)
	}
	useEffect(() => {
		if (activePopup === dataType) scrollTimeList()
	})

	const handleTimeSelect = function(e){
		onSelect(e.target.textContent, dataType)
	}

	const createTimeElem = (times) =>
		<div className={classes.wrapper} ref={wrapperElem}>
			<div className={classes.list}>
				{times.map((item, index) => {
					let [className, isActive, children] = script.getTimeElemPropsData(classes, period, item)
					return (
						<div className={className}
							onClick={handleTimeSelect}
							ref={isActive ? activeTimeElem : inactiveTimeElem}
							data-scroll-index={index}
							key={index}
						>
							{children}
						</div>
					)
				})}
			</div>
		</div>;

	const timeList = useMemo(() => script.getTimeList(), [])

	// console.log('render TimeSelect');
	return (
		<TranslateHandler>
			<Popup className={classes.popup} name={dataType} {...props}>
				{createTimeElem(timeList)}
				<Divider className={classes.divider} modif='dark' />
			</Popup>
		</TranslateHandler>
	)
})

export default TimeSelect