import { memo } from 'react';
import classes from './Document.module.scss';
import Container from '../../ui/Container/Container';
import TranslateHandler from '../../TranslateHandler';
import terms from './Terms.json'
import policy from './Policy.json'


const Document = memo(function Document({type = ''}) {

	const docs = {
		terms,
		policy
	}
	const currentDoc = docs[type] || {}
	const header = currentDoc.title || ''
	const document = currentDoc.content || []

	const content = document.map((item, index) =>
		<p className={classes.paragraph} key={index}>
			<span className={classes.id}>{index+1}.</span>
			<span className={classes.text}>{item}</span>
		</p>
	)

	return (
		<TranslateHandler>
			<Container className={classes.container}>
				<div className={classes.header}>{`?_${header}`}</div>
				{content}
				<p className={classes.copyright}>&copy; 2023 Somecompany, Inc.</p>
			</Container>
		</TranslateHandler>
	)
})

export default Document