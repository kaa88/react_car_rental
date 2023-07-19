import { memo } from 'react';
import classes from './Footer.module.scss';
import Container from '../../ui/Container/Container';
import Image from '../../ui/Image/Image';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';
import InputText from '../../ui/InputText/InputText';
import Logo from '../../ui/Logo/Logo';
import TranslateHandler from '../../TranslateHandler';
import Contacts from './Contacts/Contacts';
import Links from './Links/Links';
import Copyright from './Copyright/Copyright';
import Link from '../../ui/TextLink/TextLink';
import images from './img'


const Footer = memo(function Footer() {

	return (
		<TranslateHandler>
			<footer className={classes.footer}>

				<div className={classes.top}>
					<Container className={classes.container}>
						<InputText className={classes.callInput} placeholder='?_Phone' />
						<Button className={classes.callButton}>?_Call me back</Button>
					</Container>
				</div>

				<div className={classes.bottom}>

					<Container className={classes.container}>
						<div className={classes.footerContent}>
							<Logo className={classes.logo} modif='negative' />
							<Links className={classes.links} />
							<Contacts className={classes.contacts} />
							<Copyright className={classes.copyright} />
						</div>
					</Container>

					<div className={classes.map}>
						<Link
							className={classes.mapLink}
							href='https://goo.gl/maps/NE1tZs5vRLFDnzKV6'
							target='_blank'
							title='?_See map'
						></Link>
						<div className={classes.mapBox}>
							<Image src={images.map} />
							<Icon className={classes.point} name='icon-point' />
						</div>
					</div>

				</div>

			</footer>
		</TranslateHandler>
	)
})

export default Footer