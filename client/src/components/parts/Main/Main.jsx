import { memo } from 'react';
import classes from './Main.module.scss';
import Container from '../../ui/Container/Container';


const Main = memo(function Main({modif = 'default', page = '', children}) {

	const getLiteContent = () =>
		<Container className={classes.container}>
			{children}
		</Container>;

	return (
		<main className={classes[modif]} page={page}>
			{modif === 'lite' ? getLiteContent() : children}
		</main>
	)
})

export default Main