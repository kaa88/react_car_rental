const CallFormScript = {
	init(params = {}) {
		if (!params.inputEl) return console.error('Call form missing param "input"')
		this.input = params.inputEl
		this.phoneMask = params.phoneMask
		this.isShowPhoneMask = params.showPhoneMask
		this.change = params.change || function(){}
		this.editPhoneByMask = function(event) {
			let value = editPhoneByMask.call(this, event)
			this.change(null, value)
		}.bind(this)
		this.input.addEventListener("focus", this.editPhoneByMask)
		this.input.addEventListener("blur", this.editPhoneByMask)
		this.input.addEventListener("keydown", this.editPhoneByMask)
		this.input.addEventListener("paste", this.editPhoneByMask)
		this.input.addEventListener("input", this.editPhoneByMask)
	},
	destroy() {
		this.input.removeEventListener("focus", this.editPhoneByMask)
		this.input.removeEventListener("blur", this.editPhoneByMask)
		this.input.removeEventListener("keydown", this.editPhoneByMask)
		this.input.removeEventListener("paste", this.editPhoneByMask)
		this.input.removeEventListener("input", this.editPhoneByMask)
	},
	async send() {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(), 1000)
		})
	},
	clear() {
		this.input.value = ''
	}
}
export default CallFormScript


const editPhoneByMask = function(e) {
	// To provide better UX I decided to pay attention to cursor controlling in different situations, so here is the code to get proper cursor position
	if (!e) return;
	// next 2 funcs search for next digit position and check if cursor goes across the border
	// param 'posOffset' is for cursor arrow-moving, because in this case I need to scan 2 symbols
	function getCursorNextPosToRight(value, posOffset = 0) {
		if (input.selectionStart >= value.length) return value.length
		if (input.selectionStart < cursorMinPos) return cursorMinPos
		for (let i = input.selectionStart; i < value.length; i++) {
			if (value[i+posOffset]) {
				if (value[i+posOffset].match(/_/)) return value.indexOf('_')
				if (value[i+posOffset].match(/\d/)) return i + posOffset
			} else if (value[i].match(/_/)) return i
		}
		return value.length // for arrow-moving
	}
	function getCursorNextPosToLeft(value, posOffset = 0) {
		if (input.selectionStart - posOffset <= cursorMinPos) return cursorMinPos
		for (let i = input.selectionStart - 1; i >= 0; i--) {
			if (value[i] && value[i].match(/\d/)) return i + 1 - posOffset
		}
	}
	function getLastDigitIndex(value) {
		if (!value) return 0
		for (let i = value.length - 1; i >= 0; i--) {
			if (value[i].match(/\d/)) return i
		}
	}
	function buildValue(value) {
		// this func gets current input value, cleans NaN-garbage, splits mask with new digit-string and cuts off unfilled placeholders
		value = value.replace(/\D/g, '')
		if (value === '') value = mask.replace(/\D/g, '')
		let dIndex = 0
		let newValue = mask.replace(/[_\d]/g, function() {
			return value[dIndex++] || '_'
		})
		if (!alwaysShowMask) {
			let _Index = newValue.indexOf('_')
			let cutValue = newValue.substring(0, _Index === -1 ? undefined : _Index)
			if (cutValue.length < cursorMinPos) cutValue = mask.substring(0, cursorMinPos)
			return cutValue
		}
		return newValue
	}
	
	let
		input = e.target,
		alwaysShowMask = this.isShowPhoneMask || false,
		mask = this.phoneMask || '__________',
		cursorMinPos = mask.indexOf('_'),
		lastDigitPos = getLastDigitIndex(input.value);

	if (lastDigitPos < cursorMinPos) lastDigitPos = cursorMinPos

	if (e.type === 'focus') {
		let cursorPos = lastDigitPos
		if (input.value.length <= cursorMinPos) {
			input.value = alwaysShowMask ? mask : mask.substring(0, cursorMinPos)
		}
		else cursorPos++
		setTimeout(() => {
			if (input.selectionStart > cursorPos) {
				input.selectionStart = input.selectionEnd = cursorPos
				input.selectionStart = input.selectionEnd = getCursorNextPosToRight(input.value)
			}
			if (input.selectionStart <= cursorMinPos) input.selectionStart = input.selectionEnd = cursorMinPos
		}, 10)
	}

	if (e.type === 'blur') {
		if (alwaysShowMask) {
			if (buildValue(input.value) === mask) input.value = ''
		}
		else if (input.value.length <= cursorMinPos) input.value = ''
	}

	if (e.type === 'keydown') {
		if (e.key.match(/\d/)) {
			if (input.selectionStart <= cursorMinPos) input.selectionStart = cursorMinPos // this line works when typing after selection was made
			if (input.selectionStart > lastDigitPos) input.selectionStart = input.selectionEnd = lastDigitPos + 1
			input.selectionStart = getCursorNextPosToRight(input.value)
		}
		if (e.key === 'ArrowLeft') {
			e.preventDefault()
			input.selectionStart = input.selectionEnd = getCursorNextPosToLeft(input.value, 1)
		}
		if (e.key === 'ArrowRight') {
			e.preventDefault()
			input.selectionStart = input.selectionEnd = getCursorNextPosToRight(input.value, 1)
		}
		if (e.key === 'Delete') input.selectionStart = getCursorNextPosToRight(input.value)
		if (e.key === 'Backspace') {
			let pos = getCursorNextPosToLeft(input.value)
			if (input.selectionStart === input.selectionEnd) input.selectionStart = input.selectionEnd = pos
			else input.selectionStart = pos
		}
		this.prevAction = e.key // for the following 'input' event
	}

	if (e.type === 'paste') {
		if (input.selectionStart < cursorMinPos) input.selectionStart = cursorMinPos
		this.prevAction = e.type // for the following 'input' event
	}

	if (e.type === 'input') {
		let cursorPos = input.selectionStart, newValue = buildValue(input.value)
		if (this.prevAction === 'Backspace' && cursorPos <= cursorMinPos) cursorPos = cursorMinPos
		if (this.prevAction === 'Delete' || this.prevAction.match(/\d/)) cursorPos = getCursorNextPosToRight(newValue)
		if (this.prevAction === 'paste') cursorPos = newValue.length
		else if (this.prevAction.length < 2 && !this.prevAction.match(/\d/)) cursorPos-- // this is the way to allow digits only (as long as 'buildValue' cleans NaN-symbols, I need just return prev cursor position)... also with this solution it doesnt have conflicts with 'paste'

		input.value = newValue
		input.selectionStart = input.selectionEnd = cursorPos
		this.prevAction = null
	}
	return input.value
}
