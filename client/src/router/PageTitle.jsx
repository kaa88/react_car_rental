// import { useEffect } from 'react';

function PageTitle({value}) {

	const siteName = 'RENT@CAR'
	const divider = ' | '

	let title = siteName // обработать транслейтером
	if (value) title = value + divider + title

	// console.log(title);

	// useEffect(() => {
		document.title = title
	// }, [value])

	return <></>
}

export default PageTitle