import { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { useCustomElement } from '../../../hooks/useCustomElement';
import script from './Select.script'
import classes from './Select.module.scss';
import Icon from '../Icon/Icon';


const Select = memo(function Select({className = '', children, data, onSelect, ...props}) {

	const defaultData = {
		selected: '',
		list: []
	}
	if (typeof data !== 'object' || Array.isArray(data)) data = defaultData
	let [prevDataList, setPrevDataList] = useState(data.list)

	const select = useCustomElement(`${className} ${classes.select}`)
	const header = useCustomElement(classes.header)
	const headerText = useCustomElement(classes.headerText, data.selected)
	const listWrapper = useCustomElement(classes.listWrapper)
	const list = useCustomElement(classes.list)

	const toggleList = function(event) {
		script.toggleList(event, header, listWrapper, list)
	}

	const selectItem = useCallback((event) => {
		let onSelectValue = script.selectItem(event, headerText)
		onSelect(onSelectValue)
	}, [headerText, onSelect])

	let customOptionList = useMemo(() => data.list.map((item, index) =>
		<li className={classes.option} onClick={selectItem} key={index}>
			{item}
		</li>
	), [data.list, selectItem])

	for (let i = 0; i < data.list.length; i++) {
		if (list.children === '' || data.list[i] !== prevDataList[i]) {
			list.setChildren(customOptionList)
			setPrevDataList(data.list)
			break
		}
	}

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
	)
})

export default Select