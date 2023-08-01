import imageCompression from 'browser-image-compression';
import classes from './InputFile.module.scss';
import TranslateHandler from '../../TranslateHandler';
import { useEffect, useRef } from 'react';


function InputFile({
	modif = 'default',
	className = '',
	children,
	onChange = function({file, blob}, errorMessage){},
	isTemporary,
	...props
}) {

	const inputRef = useRef()
	useEffect(() => {
		if (isTemporary) inputRef.current.value = ''
	})

	async function compressImage(image) {
		const options = {
			maxWidthOrHeight: 890, // 410x500 is max size in the template
			initialQuality: 0.8, // 0 to 1
		}
		try {
			let compressedImage = await imageCompression(image, options)
			return new File([compressedImage], image.name, {type: image.type})
		} catch (error) {
			console.log(error)
			return image
		}
	}

	async function uploadFile(e) {
		const FILE_TYPES = ['image/jpeg', 'image/png']
		const FILE_MAX_SIZE = 10

		let file = e.target.files[0]
		if (!file) return;
		if (!FILE_TYPES.includes(file.type)) return onChange({}, 'Only images (jpeg, png) are allowed')
		if (file.size > FILE_MAX_SIZE * 1024 * 1024) return onChange({}, `File size must be less than ${FILE_MAX_SIZE} MB`)

		file = await compressImage(file)

		let reader = new FileReader()
		reader.onload = function(e) {
			onChange({file, blob: e.target.result})
		}
		reader.readAsDataURL(file)
	}

	return (
		<TranslateHandler>
			<label className={`${className} ${classes[modif]}`}>
				<input
					type='file'
					accept='image/png, image/jpeg'
					onChange={uploadFile}
					title='?_Choose file'
					ref={inputRef}
					{...props}
				/>
				{children}
			</label>
		</TranslateHandler>
	)
}

export default InputFile