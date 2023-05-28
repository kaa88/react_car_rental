import React from 'react';
import classes from './Footer.module.css';
import Container from './Container';
import Image from './ui/Image';
import Icon from './ui/Icon';
import Button from './ui/Button';
import InputText from './ui/InputText';
import Link from './ui/Link';
import Logo from './Logo';


function Footer() {

	return (
		<footer className={classes.footer}>

			<div className={classes.top}>
				<InputText className={classes.callInput} placeholder='Phone' />
				<Button className={classes.textButton}>Call me back</Button>
			</div>

			<div className={classes.bottom}>
				<div className={classes.map}>
					<Image src='img/bg.jpg' />
					<Icon className={classes.point} name='icon-point' />
				</div>
				<Container>
					<div className={classes.menu}>
						<Logo modif='negative' />
						<nav className={classes.links}>
							<Link className={classes.link}>Cars</Link>
							<Link className={classes.link}>Feedback</Link>
							<Link className={classes.link}>F.A.Q</Link>
							<Link className={classes.link}>How to rent</Link>
						</nav>
						<div className={classes.contacts}>
							<div className={classes.contactsItem}>
								<Icon name='icon-phone' size='13.3px' />
								<Link className={classes.contactsItemLink} href='tel:+1 234 567 89'>+123456789</Link>
							</div>
							<div className={classes.contactsItem}>
								<Icon name='icon-at' size='13.3px' />
								<Link className={classes.contactsItemLink} href='mailto:mail@example.com'>mail@example.com</Link>
							</div>
							<div className={classes.socials}>
								<Button className={classes.socialBtn}>
									<Icon name='icon-instagram' size='20px' />
								</Button>
								<Button className={classes.socialBtn}>
									<Icon name='icon-telegram' size='20px' />
								</Button>
							</div>
						</div>
					</div>
					<div className={classes.copyright}>
						<div className={classes.author}>
							<p>&copy; 2023 Somecompany, Inc.</p>
							<p>All rights reserved.</p>
						</div>
						<div className={classes.policy}>
							<Link modif='nohover' className={classes.policyLink} href='#terms'>Terms of Use</Link>
							<Link modif='nohover' className={classes.policyLink} href='#policy'>Privacy Policy</Link>
						</div>
					</div>
				</Container>
			</div>
		</footer>
	)
}

export default Footer