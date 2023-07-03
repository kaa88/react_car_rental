import { memo } from 'react';
import classes from './Copyright.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Link from '../../../ui/Link/Link';


const Copyright = memo(function Copyright({className = '', ...props}) {

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.copyright}`} {...props}>
				<div className={classes.author}>
					<p>&copy; 2023 Somecompany, Inc.</p>
					<p>?_All rights reserved.</p>
				</div>
				<div className={classes.policy}>
					<Link modif='nohover' className={classes.policyLink} href='#terms'>?_Terms of Use</Link>
					<Link modif='nohover' className={classes.policyLink} href='#policy'>?_Privacy Policy</Link>
				</div>
			</div>
		</TranslateHandler>
	)
})

export default Copyright