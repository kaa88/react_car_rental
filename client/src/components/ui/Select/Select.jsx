import { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { useCustomElement } from '../../../hooks/useCustomElement';
import TranslateHandler from '../../TranslateHandler';
import script from './Select.script'
import classes from './Select.module.scss';
import Icon from '../Icon/Icon';


const Select = memo(function Select({
	modif = 'default',
	className = '',
	children,
	data,
	onSelect = function(){},
	...props
}) {
	// console.log(data);

	const defaultData = {
		selected: '',
		list: []
	}
	if (typeof data !== 'object' || Array.isArray(data)) data = defaultData
	let [prevData, setPrevData] = useState(data.list)

	const select = useCustomElement(`${className} ${classes[modif]}`)
	const header = useCustomElement(classes.header)
	const headerText = useCustomElement(classes.headerText, data.selected)
	const listWrapper = useCustomElement(classes.listWrapper)
	const list = useCustomElement(classes.list)

	const toggleList = function(event) {
		script.toggleList(event, header, listWrapper, list)
	}

	const selectItem = useCallback((event) => {
		let onSelectValue = script.selectItem(event, headerText)

		// list.setChildren(customOptionList)
		// data = {...data, selected: onSelectValue}
		// setPrevData(data)
		onSelect(onSelectValue)
	}, [headerText, onSelect])

	let customOptionList = useMemo(() => data.list.map((item, index) => {
		let className = classes.option
		if (item === data.selected) className += ' ' + classes.selected
		return (
			<li className={className} onClick={selectItem} key={index}>
				{item}
				{/* {`?_${item}`} */}
			</li>
		)
	}
	), [data, selectItem])


	if (list.children === '' || data.selected !== prevData.selected) {
		list.setChildren(customOptionList)
		setPrevData(data)
	}
	// for (let i = 0; i < data.list.length; i++) {
	// 	if (list.children === '' || data.list[i] !== prevData.list[i] || ) {
	// 		list.setChildren(customOptionList)
	// 		setPrevData(data.list)
	// 		break
	// 	}
	// }

	useEffect(() => { //once
		const elems = {
			select,
			header,
			headerText,
			listWrapper,
			list,
		}
		script.init({elems, classes})
		script.setupEvents()
		return () => script.removeEvents()
	}, [])

	// console.log('render Select')
	return (
		<TranslateHandler>
			<div className={select.className} ref={select.ref} {...props}>
				<div className={header.className} ref={header.ref} onClick={toggleList}>
					<span className={headerText.className} ref={headerText.ref}>{headerText.children}</span>
					<span className={classes.headerExpandIcon}>
						<Icon name='icon-arrow-short' />
					</span>
				</div>
				<div className={listWrapper.className} ref={listWrapper.ref} onClick={toggleList}>
					<ul className={list.className} ref={list.ref}>
						{list.children}
					</ul>
				</div>
			</div>
		</TranslateHandler>
	)
})

export default Select