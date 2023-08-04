import { useSelector } from 'react-redux';


const AnchorLink = function({
	to = '',
	className = '',
	children,
	onClick = function(){}
}) {

	const anchors = useSelector(state => state.anchor.anchors)

	function goToAnchor(e) {
		e.preventDefault()
		const threshold = 5
		let pos = anchors[to] + threshold
		if (typeof pos === 'number') {
			window.scrollTo({top: pos})//, behavior: 'smooth'})
			onClick()
		}
	}

	return (
		<a className={className} href={`#${to}`} onClick={goToAnchor}>{children}</a>
	)
}

export default AnchorLink