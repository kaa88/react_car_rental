
function PageTitle({value}) {

	const siteName = 'RENT@CAR'
	const divider = ' | '

	let title = siteName // TODO: translate
	if (value) title = value + divider + title

	document.title = title

	return null
}

export default PageTitle