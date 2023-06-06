import React from 'react';
import classes from './Faq.module.css';
import Container from '../../ui/Container/Container';
import Image from '../../ui/Image/Image';
import faqData from './Faq.data.json';
import Divider from '../../ui/Divider/Divider';

// console.log(classes.divider);

function Faq() {

	return (
		<section className={classes.faq}>
			<div className={classes.bg}>
				<Image src='img/bg2.jpg' />
			</div>
			<Container>
				<h3 className='fz36 color01'>F.A.Q</h3>

				<div className={classes.faqItems}>
					{faqData.map((item, index) =>
						<div key={index} className={classes.item}>
							<p className={classes.index}>{index + 1}</p>
							<Divider className={classes.divider} />
							<p className={classes.question}>{item.q}</p>
							<p className={classes.answer}>{item.a}</p>
						</div>
					)}
				</div>

			</Container>
		</section>
	)
}

export default Faq