import fs from 'fs'

const FileService = {
	uploadUserPhoto(file) {
		if (!file || !file.name) return ''
		let fileNameParts = file.name.split('.')
		let ext = fileNameParts[fileNameParts.length - 1]
		let newFileName = `userphoto_${getRandomId(20)}.${ext}`

		let PATH = process.env.UPLOADS_PATH + '\\' + newFileName
		try {
			file.mv(PATH)
		}
		catch (err) {
			return new Error()
		}
		return newFileName
	},
	deleteUserPhoto(fileName) {
		if (!fileName) return;
		let PATH = process.env.UPLOADS_PATH + '\\' + fileName
		fs.rm(PATH, {force: true}, ()=>{})
	}
}
export default FileService


function getRandomNumber(min = 0, max = 99) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomId(length = 10) {
	const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let result = ''
	for (let i = 0; i < length; i++) {
		result += symbols[getRandomNumber(0, symbols.length-1)]
	}
	return result
}
