import { memo } from 'react';
import classes from './Contacts.module.scss';
import Icon from '../../../ui/Icon/Icon';
import Button from '../../../ui/Button/Button';
import Link from '../../../ui/TextLink/TextLink';
import TranslateHandler from '../../../TranslateHandler';


const Contacts = memo(function Contacts({className = '', ...props}) {

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.contacts}`} {...props}>
				<div className={classes.contactsItem}>
					<Icon name='icon-phone' size='13.3px' />
					<Link className={classes.contactsItemLink} href='tel:+123456789'>+1 234 567 89</Link>
				</div>
				<div className={classes.contactsItem}>
					<Icon name='icon-at' size='13.3px' />
					<Link className={classes.contactsItemLink} href='mailto:mail@example.com'>mail@example.com</Link>
				</div>
				<div className={classes.socials}>
					<Button className={classes.socialBtn} title='Instagram'>
						<Icon className={classes.instagram} name='icon-instagram' size='20px' />
					</Button>
					<Button className={classes.socialBtn} title='Telegram'>
						<Icon className={classes.telegram} name='icon-telegram' size='20px' />
					</Button>
				</div>
			</div>
		</TranslateHandler>
	)
})

export default Contacts