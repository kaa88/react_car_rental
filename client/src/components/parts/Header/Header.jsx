import React from 'react';
import classes from './Header.module.scss';
import Container from '../../ui/Container/Container';
import Link from '../../ui/Link/Link';
import Button from '../../ui/Button/Button';
import Divider from '../../ui/Divider/Divider';
import Logo from '../../ui/Logo/Logo';
import Select from '../../ui/Select/Select';
import {Translate} from '../../../script/translate';

function Header() {
	return (
		<Translate>
			<header className={classes.header}>
				<Container modif='flex'>
					<Logo style={{fontSize: '20px'}}></Logo>
					<div className={classes.menu}>
						<nav className={classes.pages}>
							<div className={classes.item}>
								<Link>?_Cars</Link>
							</div>
							<div className={classes.item}>
								<Link>?_Feedback</Link>
							</div>
							<div className={classes.item}>
								<Link>?_F.A.Q</Link>
							</div>
							<div className={classes.item}>
								<Link>?_How to rent</Link>
							</div>
						</nav>
						<div className={classes.account}>
							<Divider style={{backgroundColor: 'rgba(50,2,2,0.5)'}} />
							<Select type='currency'></Select>
							<Select type='language'></Select>
							<Button className={classes.button} modif='negative'>?_Sign in</Button>
						</div>
					</div>
				</Container>
			</header>
		</Translate>
	)
}

export default Header