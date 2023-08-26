import React, { memo } from 'react';
import classes from './Requirements.module.scss';
import TranslateHandler from '../../../TranslateHandler';

const Requirements = memo(function Requirements({className = '', ...props}) {

	const reqs = [
		"You must be 21+ years old",
		"Personal driver licence",
		"Valid credit card and 300 euro deposit",
		"Official document (driver licence or passport) for another driver",
	]

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.reqs}`} {...props}>
				<h3 className={`fz36 tac color02 ${classes.title}`}>?_Requirements</h3>
				<div className={classes.items}>
					{reqs.map((item, index) =>
						<p className={classes.item} key={index}>{`?_${item}`}</p>
					)}
				</div>
			</div>
		</TranslateHandler>
	)
})

export default Requirements