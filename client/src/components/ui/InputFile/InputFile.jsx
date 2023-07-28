import { useState } from 'react';
import classes from './InputFile.module.scss';
import Button from '../Button/Button';


function InputFile({
	modif = 'default',
	className = '',
	children,
	onChange = function(file){},
	onError = function(message){},
	...props
}) {

	let [value, setValue] = useState('')

	function handleChange(e) {
		let value = e.target.value
		setValue(value)
	}

	function uploadFile(e) {
		let file = e.target.files[0]
		if (!['image/jpeg', 'image/png'].includes(file.type)) return onError('Only images are allowed')
		if (file.size > 5 * 1024 * 1024) return onError('File is too heavy')
		setValue(e.target.value)
		let reader = new FileReader()
		reader.onload = function(e) {
			onChange(e.target.result, file)
		}
		reader.readAsDataURL(file)
	}

	return (
		<label>
			<input
				type='file'
				accept='image/png, image/jpeg'
				className={`${className} ${classes[modif]}`}
				value={value}
				onChange={uploadFile}
				{...props}
			/>
			{children}
		</label>
	)
}

export default InputFile