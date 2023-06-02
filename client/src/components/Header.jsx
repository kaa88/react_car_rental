import React from 'react';
import classes from './Header.module.css';
import Container from './Container';
import Link from './ui/Link';
import Button from './ui/Button';
import Divider from './ui/Divider';
import Logo from './Logo';
import Select from './ui/Select';

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
						<Select type='currency' icon='icon-arrow-short'></Select>
						<Select type='language' icon='icon-arrow-short'></Select>
						<Button className={classes.button} modif='negative'>Sing in</Button>
					</div>
				</div>
			</Container>
		</header>
	)
}

export default Header