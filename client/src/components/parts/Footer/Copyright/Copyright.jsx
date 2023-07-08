import { memo } from 'react';
import classes from './Copyright.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import { Link } from 'react-router-dom';


const Copyright = memo(function Copyright({className = '', ...props}) {

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.copyright}`} {...props}>
				<div className={classes.author}>
					<p>&copy; 2023 Somecompany, Inc.</p>
					<p>?_All rights reserved.</p>
				</div>
				<div className={classes.policy}>
					<Link to='/terms' target='_blank' className={classes.policyLink}>?_Terms of Use</Link>
					<Link to='/policy' target='_blank' className={classes.policyLink}>?_Privacy Policy</Link>
				</div>
			</div>
		</TranslateHandler>
	)
})

export default Copyright