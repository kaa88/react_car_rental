import { useRef, useState } from "react"

export function useCustomElement(classNameAttr = '', childrenAttr = '') {
	let [className, setClassName] = useState(classNameAttr)
	let [children, setChildren] = useState(childrenAttr)
	return {
		className,
		setClassName,
		children,
		setChildren,
		ref: useRef(),
		get el() {return this.ref.current}
	}
}