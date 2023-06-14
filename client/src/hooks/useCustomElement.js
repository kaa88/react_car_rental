import { useRef, useState } from "react"
// import { getClassListForCustomElement } from '../script/classNameChanger'

export function useCustomElement(classNameAttr = '', childrenAttr = '', other) { // (str, any, obj)
	if (typeof classNameAttr !== 'string') console.error('Hook "useCustomElement" 1st argument must be a "string"')
	if (other && (typeof other !== 'object' || Array.isArray(other))) {
		console.error('Hook "useCustomElement" 3rd argument must be an "object"')
		other = {}
	}
	let [className, setClassName] = useState(classNameAttr)
	let [children, setChildren] = useState(childrenAttr)
	return Object.assign({
		className,
		setClassName,
		// classList: getClassListForCustomElement(className, setClassName),
		children,
		setChildren,
		ref: useRef(),
		get el() {return this.ref.current}
	}, other)
}
