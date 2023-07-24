import { cloneElement, isValidElement } from 'react'
import classes from './Form.module.scss';
import classNameChanger from '../../../utilities/classNameChanger';

const Form = function({
	className = '',
	children = '',
	onSubmit = function(){},
	...props
}) {

	let newChildren = [...children]
	console.log(newChildren);
	const vali = {
		email() {

		},
		password() {
			return false
		}
	}
	const ERROR_MESSAGE = 'errorMessage'
	const SUCCESS_MESSAGE = 'successMessage'

	const validate = function(e) {
		e.preventDefault()

		newChildren = scan(children)

		onSubmit()
	}

	function scan(elem, index = 0) {
		console.log('scan');
		if (Array.isArray(elem)) {
			return elem.map((item, i) => scan(item, i))
		}

		else if (typeof elem === 'object') {
			if (!isValidElement(elem) || !elem.props) return elem
			let newProps = {key: index}
			Object.entries(elem).forEach(([key, prop]) => {
				if (key === 'props') {
					let name = prop.name
					let value = prop.value
					let className = prop.className
					let children = prop.children
					let newClassName
					if (name === 'password') {
						if (!vali.password(value)) newClassName = classNameChanger.add(className, classes.error)
						else newClassName = classNameChanger.remove(className, classes.error)
						newProps.className = newClassName
					}
					if (children && typeof children === 'object') newProps.children = scan(children)
				}
				// else newProps[key] = prop
			})
			console.log(newProps);
			// не работает добавление класса
			let {children, ...props} = newProps
			return cloneElement(elem, props, children)
		}

		else return elem
	}
	// const handleSubmit = function(e) {
	// }

	return (
		<form
			className={`${className} ${classes.form}`}
			onSubmit={validate}
			action="#"
			{...props}
		>
			{newChildren}
		</form>
	)
}
export default Form