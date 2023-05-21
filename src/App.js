import './css/App.css';
import IconButton from './components/ui/IconButton';
import InputText from './components/ui/InputText';
import Link from './components/ui/Link';
import TextButton from './components/ui/TextButton';
import Icon from './components/ui/Icon';
import Image from './components/ui/Image';

import cars from './cars.json';
import Container from './components/Container';
import Header from './components/Header';
import Banner from './components/Banner';


function App() {

	console.log(cars);

	return (
		<>
			<Header />
			<Banner />


			<Container>
				<p>text</p>
			</Container>
			<TextButton></TextButton>
			<TextButton modif='negative'>Book now</TextButton>
			<IconButton></IconButton>
			<IconButton modif='negative'></IconButton>
			<Link>Home</Link>
			<Link modif='underlined' href='#top'></Link>
			<InputText />
			<InputText modif='textCenter' placeholder='type something here' />
			<Icon name='icon-ok'></Icon>
			<Icon name='icon-email'></Icon>
			<Icon style={{background: '#aaa'}}></Icon>
		</>
	);
}

export default App;
