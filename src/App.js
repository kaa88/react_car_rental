import './App.css';
import IconButton from './components/ui/IconButton';
import TextButton from './components/ui/TextButton';

function App() {

	let styles = {
		button: {
			color: 'var(--color05)',
			backgroundColor: 'transparent'
		},
		input: {

		}
	}

	return (
		<>
			<TextButton></TextButton>
			<TextButton type='negative'>Book now</TextButton>
			<IconButton></IconButton>
			<IconButton type='negative'></IconButton>
		</>
	);
}

export default App;
