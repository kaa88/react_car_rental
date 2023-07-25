import { useState } from "react"

const ERROR_REQUIRED = 'required'
const ERROR_INCORRECT = 'incorrect'

const messages = {
	email: {
		required: 'Email is required',
		incorrect: 'Incorrect email'
	},
	password: {
		required: 'Password is required',
		incorrect: 'Incorrect password'
	},
}

const validation = {
	email(value) {},
	password(value) {
		if (value.length < 4) return false
		else return true
	},
}

function validate(required, type, value) {
	let isValid = false
	let errorType = ''
	if (value) {
		if (validation[type](value)) isValid = true
		else errorType = ERROR_INCORRECT
	}
	else {
		if (required) errorType = ERROR_REQUIRED
		else isValid = true
	}
	return {isValid, errorType}
}

export function useFormField(params = {}) {
	const type = params.type || 'text'
	const required = params.required || false
	const defaultIsValid = required ? false : true
	const defaultErrorType = required ? ERROR_REQUIRED : ''

	let [value, setValue] = useState('')
	let [isValid, setIsValid] = useState(defaultIsValid)
	let [isError, setIsError] = useState(false)
	let [errorType, setErrorType] = useState(defaultErrorType)

	return {
		value,
		isValid, // постоянно обновляющееся состояние для проверки валдиности
		isError, // индикация состояния ошибки (для CSS), включается при сабмите
		errorType, // тип ошибки для выбора варианта глобальной ошибки и отмены отправки формы
		get errorMessage() {return messages[type][errorType]}, // сообщение под каждым полем
		change(e, value) {
			if (e) value = e.target.value || ''
			setValue(value)
			let {isValid, errorType} = validate(required, type, value)
			setIsValid(isValid)
			setErrorType(isValid ? '' : errorType)
			if (isError) setIsError(false)
			// может быть часть задач сделать только для сабмита, чтобы разгрузить инпут???
		},
		validate() {
			setIsError(!isValid)
			return !isValid ? null : errorType
		},
		clear() {
			setValue('')
			setIsValid(defaultIsValid)
			setErrorType(defaultErrorType)
		},
	}
}
