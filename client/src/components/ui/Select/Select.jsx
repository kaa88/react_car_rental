import { useCallback, useEffect, useMemo, useState, memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSelect } from '../../../store/slices/selectSlice';
import { translate } from '../../TranslateHandler';
import {getRandomId} from '../../../utilities/utilities';
import classes from './Select.module.scss';
import Icon from '../Icon/Icon';


const Select = memo(function Select({
	modif = 'default',
	className = '',
	data,
	onSelect = function(){},
	applyTranslator = false,
	children,
	...props
}) {
	const defaultData = {
		selected: '',
		list: []
	}
	if (typeof data !== 'object' || Array.isArray(data)) data = defaultData

	const [currentSelect] = useState(getRandomId(5))
	const dispatch = useDispatch()
	const activeSelect = useSelector(state => state.select.active)
	const activeClass = (activeSelect === currentSelect && data.list.length) ? classes.active : ''

	const toggleList = function(e) {
		e.stopPropagation()
		let value = activeClass ? '' : currentSelect
		dispatch(setActiveSelect(value))
	}

	const listWrapperRef = useRef()
	useEffect(() => {
		const listWrapperEl = listWrapperRef.current
		const listEl = listWrapperEl.children[0]
		listWrapperEl.style.height = activeClass ? listEl.offsetHeight + 'px' : ''
	}, [activeClass])

	const selectItem = useCallback((e) => {
		onSelect(e.target.dataset.value)
	}, [onSelect])

	const language = useSelector(state => state.language) // alternative usage of TranslateHandler

	let customOptionList = useMemo(() => data.list.map((item, index) => {
		let className = classes.option
		if (item === data.selected) className += ' ' + classes.selected
		return (
			<li className={className} data-value={item} onClick={selectItem} key={index}>
				{applyTranslator ? translate(`?_${item}`, language) : item}
			</li>
		)
	}
	), [data, selectItem, applyTranslator, language])

	return (
		<div className={`${className} ${classes[modif]}`} {...props}>
			<div className={`${classes.header} ${activeClass}`} onClick={toggleList}>
				<span className={classes.headerText}>{applyTranslator ? translate(`?_${data.selected}`, language) : data.selected}</span>
				<span className={classes.headerExpandIcon}>
					<Icon name='icon-arrow-short' />
				</span>
			</div>
			<div className={`${classes.listWrapper} ${activeClass}`} ref={listWrapperRef} onClick={toggleList}>
				<ul className={classes.list}>
					{customOptionList}
				</ul>
			</div>
		</div>
	)
})

export default Select