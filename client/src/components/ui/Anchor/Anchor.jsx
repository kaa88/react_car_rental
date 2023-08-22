import { memo, useEffect, useRef } from 'react';
import classes from './Anchor.module.scss';
import { useDispatch } from 'react-redux';
import { setAnchorPosition, clearAnchorPosition, setActiveAnchor } from '../../../store/slices/anchorSlice';


const Anchor = memo(function Anchor({name = ''}) {

	const dispatch = useDispatch()
	const ref = useRef()

	function calcPosition() {
		dispatch(setAnchorPosition({
			name,
			position: Math.round(ref.current.getBoundingClientRect().y + window.scrollY)
		}))
	}

	function clearPosition() {
		dispatch(clearAnchorPosition(name))
	}
	
	function setCurrentAnchor() {
		dispatch(setActiveAnchor())
	}

	useEffect(() => {
		calcPosition()
		setCurrentAnchor()
		window.addEventListener('resize', calcPosition)
		window.addEventListener('scroll', setCurrentAnchor)
		return () => {
			clearPosition()
			window.removeEventListener('resize', calcPosition)
			window.removeEventListener('scroll', setCurrentAnchor)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className={classes.anchor} ref={ref}>{name}</div>
	)
})

export default Anchor