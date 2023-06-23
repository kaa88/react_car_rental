import { memo, useMemo, useState } from 'react';
// import script from './Popup.script';
import classes from './Popup.module.scss';
import TranslateHandler from '../../../../TranslateHandler';
// import { useCustomElement } from '../../../hooks/useCustomElement';

const Popup = memo(function Popup({modif = 'default', className = '', children, ...props}) {

	const showPopup = function() {}
	const hidePopup = function() {}

	return (
		<TranslateHandler>
			<div className={`${className} ${classes[modif]}`} {...props}>
				{children}
			</div>
		</TranslateHandler>
	)
})

export default Popup