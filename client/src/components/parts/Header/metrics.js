import { changeWindowHeight, changeHeaderHeight, changeHeaderPosition } from '../../../store/reducers/headerReducer'


const metrics = {
	init({header, state, dispatch, setHeaderStyle}) {
		this.header = header
		this.headerHeight = {
			value: state.headerHeight,
			setState(value) {dispatch(changeHeaderHeight(value))},
			var: '--header-height'
		}
		this.headerPosition = {
			value: state.headerPosition,
			setState(value) {dispatch(changeHeaderPosition(value))},
			var: '--header-position'
		}
		this.windowHeight = {
			value: state.windowHeight,
			setState(value) {dispatch(changeWindowHeight(value))},
			var: '--window-height'
		}
		this.setHeaderStyle = setHeaderStyle
		this.headerStyle = {}

		window.addEventListener('resize', this.calcHeaderHeight.bind(this))
		this.calcHeaderHeight(false, true)
	},
	calcHeaderHeight(e) {
		const newMertics = {
			windowHeight: window.innerHeight,
			headerHeight: this.header.el.offsetHeight,
			headerPosition: 0
		}
		let updateStyle = false, newStyle = {};
		Object.entries(newMertics).forEach(([key, value]) => {
			if (value !== this[key].value) {
				updateStyle = true
				value = Math.round(value * 10) / 10
				this[key].value = value
				this[key].setState(value)
				newStyle[this[key].var] = value + 'px'
			}
		})
		if (updateStyle) {
			this.headerStyle = Object.assign({}, this.headerStyle, newStyle)
			this.setHeaderStyle(this.headerStyle)
		}

		// return [this.headerHeight, this.headerPosition]
	},
}
export default metrics


	// Hiding Header
	// hidingHeader: {
	// 	initiated: false,
	// 	init: function(that) {
	// 		this.root = that;
			
	// 		// hidingHeader settings
	// 		if (this.root.params.hidingHeader)
	// 			window.addEventListener('scroll', this.moveHeader.bind(this));
	// 		this.firstMoveScroll = true;

	// 		// hidingHeaderCompactMode settings
	// 		if (this.root.params.hidingHeaderCompactMode)
	// 			window.addEventListener('scroll', this.setCompactMode.bind(this));
	// 			this.firstCompactScroll = true;
	// 			this.status = this.prevStatus = false; // false = normal, true = compact

	// 		this.initiated = true
	// 	},
	// 	returnHeader: function(instant) {
	// 		if (!this.initiated || this.root.headerPosition == this.root.headerOffset) return;
	// 		if (instant) {
	// 			this.root.headerPosition = this.root.headerOffset
	// 			this.root.setCssVar()
	// 			return
	// 		}
	// 		let
	// 			timeoutMultiplier = 0.7,
	// 			timeInterval = 10,
	// 			startTime = new Date().valueOf(),
	// 			startValue = this.root.headerPosition,
	// 			newValue,
	// 			moveStep = (this.root.headerOffset - this.root.headerPosition) / (this.root.timeout * timeoutMultiplier) / timeInterval * 100;

	// 		let timerid = setInterval(function(){
	// 			newValue = startValue + (new Date().valueOf() - startTime) * moveStep / timeInterval;
	// 			if (newValue >= this.root.headerOffset) this.root.headerPosition = this.root.headerOffset
	// 			else this.root.headerPosition = newValue
	// 			this.root.setCssVar()
	// 		}.bind(this), timeInterval)

	// 		setTimeout(function(){
	// 			clearInterval(timerid);
	// 			this.root.headerPosition = this.root.headerOffset
	// 			this.root.setCssVar()
	// 		}.bind(this), this.root.timeout * timeoutMultiplier)
	// 	},
	// 	moveHeader: function() {
	// 		if (!this.initiated) return;
	// 		if (this.root.params.hidingHeaderView == 'mobile' && window.innerWidth > this.root.away.getMobileBreakpoint()) return;
	// 		if (this.root.params.hidingHeaderView == 'desktop' && window.innerWidth <= this.root.away.getMobileBreakpoint()) return;

	// 		// this 'if' prevents header's jump after page reloading in the middle of the content
	// 		if (this.firstMoveScroll) {
	// 			this.Y = this.YPrev = scrollY;
	// 			this.diff = 0;
	// 			return this.firstMoveScroll = false
	// 		}
	// 		// lazyLoad check
	// 		if ((scrollY < (this.Y + this.diff) && this.Y > this.YPrev) || (scrollY > (this.Y + this.diff) && this.Y < this.YPrev)) {
	// 			this.diff = scrollY - this.Y;
	// 		}
	// 		// scroll-move
	// 		let
	// 			currentPos = this.root.headerPosition,
	// 			visiblePos = this.root.headerOffset,
	// 			hiddenPos = visiblePos - this.root.headerHeight - this.root.params.hiddenPositionOffset;
	// 		this.YPrev = this.Y;
	// 		this.Y = scrollY - this.diff;
	// 		currentPos -= this.Y - this.YPrev;
	// 		if (currentPos > visiblePos) currentPos = visiblePos;
	// 		if (currentPos < hiddenPos) currentPos = hiddenPos;
	// 		this.root.headerPosition = currentPos;
	// 		this.root.setCssVar()
	// 	},
	// 	setCompactMode: function() {
	// 		if (!this.initiated) return;
	// 		if (this.firstCompactScroll) return this.firstCompactScroll = false
	// 		this.status = window.scrollY > this.root.params.compactModeThreshold ? true : false;
	// 		if (this.status != this.prevStatus) {
	// 			if (this.status) this.root.header.classList.add(this.root.names.stateCompact)
	// 			else this.root.header.classList.remove(this.root.names.stateCompact)
	// 			this.prevStatus = this.status
	// 		}
	// 	},
	// 	removeCompactMode: function() {
	// 		if (!this.initiated) return;
	// 		this.root.header.classList.remove(this.root.names.stateCompact)
	// 		this.prevStatus = this.status = false
	// 	}
	// }
	// /Hiding Header
