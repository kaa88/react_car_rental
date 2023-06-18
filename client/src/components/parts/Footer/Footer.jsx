import { memo } from 'react';
import classes from './Footer.module.scss';
import Container from '../../ui/Container/Container';
import Image from '../../ui/Image/Image';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';
import InputText from '../../ui/InputText/InputText';
import Link from '../../ui/Link/Link';
import Logo from '../../ui/Logo/Logo';
import {Translate} from '../../../script/translate';


const Footer = memo(function Footer() {

	return (
		<Translate>
			<footer className={`${classes.footer} scroll-lock-item-p`}>

				<div className={classes.top}>
					<InputText className={classes.callInput} placeholder='?_Phone' />
					<Button className={classes.textButton}>?_Call me back</Button>
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
								<Link className={classes.link}>?_Cars</Link>
								<Link className={classes.link}>?_Feedback</Link>
								<Link className={classes.link}>?_F.A.Q</Link>
								<Link className={classes.link}>?_How to rent</Link>
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
								<p>?_All rights reserved.</p>
							</div>
							<div className={classes.policy}>
								<Link modif='nohover' className={classes.policyLink} href='#terms'>?_Terms of Use</Link>
								<Link modif='nohover' className={classes.policyLink} href='#policy'>?_Privacy Policy</Link>
							</div>
						</div>
					</Container>
				</div>
			</footer>
		</Translate>
	)
})

export default Footer