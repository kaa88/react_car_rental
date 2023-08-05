import { memo } from 'react';
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import classes from './HeaderMenu.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import AnchorLink from '../../../ui/Anchor/AnchorLink';


const MenuLinks = memo(function MenuLinks({
	onLinkClick = function(){},
	importedClasses,
}) {
	const styles = importedClasses || classes
	
	const menuLinks = {
		index: [
			{ name: 'Rent a car', to: 'rent', type: 'anchor' },
			{ name: 'Cars', to: 'cars', type: 'anchor' },
			{ name: 'F.A.Q', to: 'faq', type: 'anchor' },
			{ name: 'Feedback', to: 'feedback', type: 'anchor' },
		],
		account: [
			{ name: 'Home', to: '/' },
		],
		reservation: [
			{ name: 'Home', to: '/' },
		],
	}

	let currentPageLinks = menuLinks.index
	const location = useLocation()
	const pageName = location.pathname.slice(1)
	if (pageName && menuLinks.hasOwnProperty(pageName)) currentPageLinks = menuLinks[pageName]

	const activeLink = useSelector(state => state.anchor.active)

	const getLink = (name, to) =>
		<Link
			to={to}
			className={styles.menuLink}
			onClick={onLinkClick}
		>
			{`?_${name}`}
		</Link>;

	const getAnchorLink = (name, to) =>
		<AnchorLink
			className={`${styles.menuLink} ${to === activeLink ? styles.active : ''}`}
			activeClass={styles.active}
			to={to}
			onClick={onLinkClick}
		>
			{`?_${name}`}
		</AnchorLink>;

	const getLinks = () => currentPageLinks.map((item, index) => {
		let get = item.type === 'anchor' ? getAnchorLink : getLink
		return (
			<li className={styles.menuItem} key={index}>
				{get(item.name, item.to)}
			</li>
		)
	})

	return (
		<TranslateHandler>
			{getLinks()}
		</TranslateHandler>
	)
})

export default MenuLinks
