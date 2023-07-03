import { memo } from 'react';
import classes from './Links.module.scss';
import Link from '../../../ui/Link/Link';
import TranslateHandler from '../../../TranslateHandler';


const Links = memo(function Links({className = '', ...props}) {

	const menuLinks = [
		{ name: 'Cars',				href: '#' },
		{ name: 'Feedback',			href: '#' },
		{ name: 'F.A.Q',				href: '#' },
		{ name: 'How to rent',		href: '#' },
	]

	return (
		<TranslateHandler>
			<nav className={`${className} ${classes.links}`} {...props}>
				{menuLinks.map((item, index) =>
					<Link className={classes.link} href={item.href} key={index}>{`?_${item.name}`}</Link>
				)}
			</nav>
		</TranslateHandler>
	)
})

export default Links