/* 
	Module prevents double-clicking on transitions, e.g. when menu slides.
	Use: if (transitionLock.check( *timeout* )) return;
*/

let isLocked = false

export const transitionLock = {
	check(timeout = 0) {
		let result = isLocked
		if (isLocked === false) {
			isLocked = true
			setTimeout(function(){
				isLocked = false
			}, timeout)
		}
		return result
	}
}
