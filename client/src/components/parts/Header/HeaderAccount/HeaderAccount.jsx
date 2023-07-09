import React, { useState, memo, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useCustomElement } from '../../../../hooks/useCustomElement';
// import script from './HeaderAccount.script';
import classes from './HeaderAccount.module.scss';
import TranslateHandler from '../../../TranslateHandler';
import Button from '../../../ui/Button/Button';
import Divider from '../../../ui/Divider/Divider';
import OptionsSelect from '../../../ui/OptionsSelect/OptionsSelect';
import ModalLink from '../../../ui/Modal/ModalLink'


const HeaderAccount = memo(function HeaderAccount({className = ''}) {

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.account}`}>
				<Divider modif='dark' className={classes.divider} />
				<OptionsSelect type='currency' />
				<OptionsSelect type='language' />
				<ModalLink name='signin'>
					<Button className={classes.accountButton} modif='negative'>?_Sign in</Button>
				</ModalLink>
			</div>
		</TranslateHandler>
	)
})

export default HeaderAccount
