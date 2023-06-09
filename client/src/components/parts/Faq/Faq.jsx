import { memo } from 'react';
import classes from './Faq.module.scss';
import Container from '../../ui/Container/Container';
import Image from '../../ui/Image/Image';
import faqData from './Faq.data.json';
import Divider from '../../ui/Divider/Divider';
import TranslateHandler from '../../TranslateHandler';


const Faq = memo(function Faq() {

	return (
		<TranslateHandler>
			<section className={classes.faq}>
				<div className={classes.bg}>
					<Image src='img/bg2.jpg' />
				</div>
				<Container>
					<h3 className={classes.title}>F.A.Q</h3>

					<div className={classes.faqItems}>
						{faqData.map((item, index) =>
							<div key={index} className={classes.item}>
								<p className={classes.index}>{index + 1}</p>
								<Divider className={classes.divider} />
								<p className={classes.question}>{`?_${item.q}`}</p>
								<p className={classes.answer}>{`?_${item.a}`}</p>
							</div>
						)}
					</div>

				</Container>
			</section>
		</TranslateHandler>
	)
})

export default Faq