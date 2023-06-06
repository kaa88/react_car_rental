import React from 'react';
import classes from './Header.module.css';
import Container from '../../ui/Container/Container';
import Link from '../../ui/Link/Link';
import Button from '../../ui/Button/Button';
import Divider from '../../ui/Divider/Divider';
import Logo from '../../ui/Logo/Logo';
import Select from '../../ui/Select/Select';

function Header() {
	return (
		<header className={classes.header}>
			<Container modif='flex'>
				<Logo style={{fontSize: '20px'}}></Logo>
				<div className={classes.menu}>
					<nav className={classes.pages}>
						<div className={classes.item}>
							<Link>Cars</Link>
						</div>
						<div className={classes.item}>
							<Link>Feedback</Link>
						</div>
						<div className={classes.item}>
							<Link>F.A.Q</Link>
						</div>
						<div className={classes.item}>
							<Link>How to rent</Link>
						</div>
					</nav>
					<div className={classes.account}>
						<Divider style={{backgroundColor: 'rgba(50,2,2,0.5)'}} />
						<Select type='CURRENCY'></Select>
						<Select type='LANGUAGE'></Select>
						<Button className={classes.button} modif='negative'>Sing in</Button>
					</div>
				</div>
			</Container>
		</header>
	)
}

export default Header