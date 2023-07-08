import { memo } from 'react';
import classes from './Terms.module.scss';
import Container from '../../ui/Container/Container';
import TranslateHandler from '../../TranslateHandler';


const Terms = memo(function Terms() {

	const document = [
		"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur at quibusdam eos temporibus tempora voluptatum eligendi accusamus exercitationem repellendus sit.",

		"Placeat ratione similique, animi rerum quis fugiat aperiam perferendis pariatur molestiae odio saepe laborum quae quaerat hic rem architecto, modi temporibus libero vitae? Temporibus voluptatibus at in ad, inventore quia velit similique voluptate molestias asperiores totam repudiandae libero, doloribus est!",

		"Ut autem, quos id iure enim odio et expedita officiis voluptatum quia praesentium est accusamus, dolorem incidunt! Explicabo, quasi, eveniet tenetur officiis facere assumenda corrupti praesentium iste qui culpa numquam dignissimos dolorum aspernatur sit quos exercitationem. Sint quasi veritatis deleniti consequuntur explicabo consectetur, mollitia pariatur nobis ex sequi aut in illum nemo possimus magni harum sunt maiores dicta repellat.",

		"Numquam omnis optio delectus facilis fugit incidunt ut itaque, unde placeat harum exercitationem. Quidem, eum error placeat aut quibusdam aliquam nostrum unde inventore! Unde natus nihil cum asperiores. Temporibus praesentium provident earum possimus numquam illum rem laudantium nostrum? Nemo vero aut facere eveniet laudantium necessitatibus itaque nobis eius. Nisi enim aut suscipit obcaecati! Laudantium a saepe ad nemo placeat ab natus in consectetur.",

		"Ullam quisquam veritatis autem hic illum nisi alias doloremque laboriosam ipsam quo? Earum totam fugiat culpa accusantium modi, magnam animi eligendi laboriosam nulla provident, quasi distinctio! Beatae impedit officia neque tempore, animi assumenda? Quo accusantium magnam labore voluptatibus quod, atque ab eum! Qui repudiandae officia sed vel cupiditate inventore voluptates quis magni vitae corrupti aliquam recusandae perspiciatis quam nisi illo nostrum modi, ab odit sunt distinctio in reiciendis omnis reprehenderit. Iste iure obcaecati earum doloribus deleniti accusamus minus, necessitatibus tempora sed eveniet laborum!",

		"Commodi, corrupti dignissimos hic reiciendis laborum perferendis nam sed nostrum tenetur ducimus architecto repellendus distinctio nesciunt placeat quo, magnam aspernatur animi debitis, suscipit nisi ab veniam.",

		"Cum accusantium dolorum ipsum sapiente eos odio unde mollitia distinctio rem recusandae et dolor officia quas delectus voluptates, quaerat labore fugiat accusamus, corporis autem? Vel a, hic doloremque perspiciatis libero, dicta dolor laboriosam expedita in accusantium sequi nisi velit ipsa corporis voluptate rerum facere eaque officiis. Quod deserunt atque, voluptates corrupti natus porro, sit aperiam quas est eaque quaerat officia cupiditate alias quo sint consequatur ea quos omnis saepe accusamus, tenetur facere fugiat.",

		"Maxime vitae autem numquam culpa sunt exercitationem fugiat omnis animi, at itaque neque molestias. Amet, voluptatem porro sint aspernatur omnis numquam adipisci harum exercitationem animi beatae odio fuga earum ipsam. Sequi hic aperiam alias? Illum ex nostrum odio doloribus iusto quas explicabo, nesciunt maiores eius placeat aut animi accusamus magni.",

		"Mollitia eos, quasi sapiente voluptatibus blanditiis tenetur, excepturi voluptatum impedit cum rerum repellat at, illum quibusdam totam nobis aspernatur numquam quas molestiae. Explicabo vel molestias debitis minus quam, quia dicta nisi a molestiae.",

		"Aperiam, ullam? Deleniti alias aliquam, repudiandae esse earum ratione. Natus cumque exercitationem fugiat ipsa alias? Labore fuga quaerat animi commodi blanditiis in placeat rem sint rerum ratione quae, autem voluptatum, sapiente recusandae error tempora repudiandae itaque nobis corporis necessitatibus temporibus harum tempore!",

		"Nihil vero sunt molestiae, voluptas similique laborum quibusdam corrupti commodi veritatis repellendus dolor eligendi incidunt dignissimos quia at nesciunt, vitae maxime hic tempora porro ratione iusto necessitatibus distinctio. Provident, dolorum. Voluptates id vero adipisci! Obcaecati possimus maxime aut veritatis cum, perspiciatis inventore ut neque nam sunt explicabo accusamus veniam nisi dolor quasi nobis distinctio rerum in animi. Dolorum magni harum maiores placeat consequuntur sit dicta perspiciatis.",

		"Laboriosam expedita, quas iure quis dolore quod enim? Minus dolor, praesentium repellat mollitia, harum sunt hic qui sed libero facilis quas recusandae doloribus quis aspernatur aliquid modi molestiae accusamus? Quam aut neque doloremque doloribus adipisci quisquam reiciendis dolore provident eveniet? Explicabo quibusdam ex expedita.",

		"Nam assumenda mollitia dignissimos, cumque excepturi illo quam voluptas id voluptatem eaque accusamus sequi corporis quo in, fuga quisquam consectetur? Repellendus provident magni veniam officiis animi voluptas tempora, perferendis praesentium ipsam impedit iure, laudantium omnis nulla at. Sunt, recusandae.",

		"Exercitationem accusamus necessitatibus quis, animi corporis, soluta magni odit excepturi ut nobis aliquid odio vitae tenetur, iste veniam magnam quibusdam officia possimus sequi maiores optio quaerat.",

		"Molestiae, veniam ea. Modi, pariatur eum maiores ratione corrupti doloribus delectus molestias possimus, laboriosam error repellat. In, quos fugiat quod dolorum ut non, esse molestiae assumenda quaerat similique iste qui ipsum. Quia laudantium voluptates voluptas nisi.",
	]

	const content = document.map((item, index) =>
		<p className={classes.paragraph} key={index}>
			<span className={classes.id}>{index+1}.</span>
			<span className={classes.text}>{item}</span>
		</p>
	)

	return (
		<TranslateHandler>
			<Container className={classes.container}>
				<div className={classes.header}>?_Terms of Use</div>
				{content}
				<p className={classes.copyright}>&copy; 2023 Somecompany, Inc.</p>
			</Container>
		</TranslateHandler>
	)
})

export default Terms