import { memo } from 'react';
import classes from './LiteHeader.module.scss';
import Container from '../../../ui/Container/Container';
import Logo from '../../../ui/Logo/Logo';
import OptionsSelect from '../../../ui/OptionsSelect/OptionsSelect';


const LiteHeader = memo(function LiteHeader({className = ''}) {

	return (
		<div className={`${className} ${classes.box}`}>
			<Container className={classes.container}>
				<Logo />
				<OptionsSelect type='language' />
			</Container>
		</div>
	)
})

export default LiteHeader
