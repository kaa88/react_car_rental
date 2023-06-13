import { jsMediaQueries } from '../../../script/jsMediaQueries'
import Metrics from './metrics';
import Menu from './menu';


const header = {
	init({headerParams, classes, header, menuHideWrapper, menu, metricsStore, breakpointStore, dispatch, setHeaderStyle}) {
		Metrics.init({header, state: metricsStore, dispatch, setHeaderStyle})
		this.metrics = Metrics
		if (headerParams.menu) {
			Menu.init({headerParams, header, menuHideWrapper, menu, classes, breakpointStore})
			this.menu = Menu
			jsMediaQueries.registerAction(breakpointStore.tablet, this.menu.hideMenuOnViewChange.bind(this.menu))
			jsMediaQueries.registerAction(breakpointStore.mobile, this.menu.hideMenuOnViewChange.bind(this.menu))
		}

	},
}
export default header


const header_old = {
	selfName: 'header',
	names: {
		// selectors:
		header: '.header',
		menu: '.header-menu-hide-wrapper',
		menuNav: '.header-menu',
		menuItems: '.header-menu__items',
		menuItem: '.header-menu__item',
		menuOpenBtn: '.header-menu-open-btn',
		menuCloseBtn: '.header-menu-close-btn',
		// menuBackBtn: '.header-submenu-back-btn',
		menuArea: '.header-menu-turnoff-area',
		// submenu: '.header-submenu-hide-wrapper',
		// submenuLink: '.submenu-link',
		// class names:
		switchToDesktop: 'hide-on-switch-to-desktop',
		switchToMobile: 'hide-on-switch-to-mobile',
		// state class names:
		stateStatic: 'header--static',
		stateFixed: 'header--fixed',
		stateCompact: 'header--compact',
		stateActive: 'header--active', // elems: headerElem, menuElem, submenu, toggleButtons, closeButtons, menuLink
		stateShared: 'header--shared', // headerElem
		stateSharedDelayed: 'header--shared-z', // headerElem
		// css variable names:
		varTimer: '--timer-menu',
	},
	// away: {
	// 	getMobileBreakpoint: function(){},
	// 	lockScroll: function(){},
	// 	unlockScroll: function(){},
	// 	transitionIsLocked: function(){},
	// 	closeOtherModules: function(skipLock){},
	// },
	// metrics: typeof headerMetrics != 'undefined' ? headerMetrics : null,
	// params: {},
	// initiated: false,
	init: function(params) {
		// Здесь был блок, который (при отсутствии хедера) добавлял пустой хедер. Продолжали работать метрики для того, чтобы CSS-переменными могли пользоваться другие модули. Но потом поставил в CSS дефолтные значения (нули). Теперь модули так же могут пользоваться переменными, а модуль header можно отключить. (пишу для себя, т.к. забываю про это)

		if (this.metrics) this.headerElem = this.metrics.headerElem;
		else {
			console.log(`[${this.selfName}] ERR! "header metrics" not found`)
			this.headerElem = document.body.querySelector(this.names.header)
		}
		if (!this.headerElem) return;
		
		// Check params
		if (params) this.params = params
		if (!this.params.headerPositionFixed) this.params.hidingHeader = this.params.hidingHeaderCompactMode = null

		if (this.params.hidingHeaderView) {
			if (typeof this.params.hidingHeaderView != 'string' || !this.params.hidingHeaderView.match(/^mobile$|^desktop$|^both$/))
				this.params.hidingHeaderView = 'both'
		} else if (typeof this.params.hidingHeaderView == 'undefined') this.params.hidingHeaderView = 'both'

		if (this.params.hidingHeaderCompactMode) {
			if (this.params.hidingHeaderView == 'desktop') this.params.hidingHeaderView = null
			if (this.params.hidingHeaderView == 'both') this.params.hidingHeaderView = 'mobile'
		}

		if (typeof this.params.compactModeThreshold != 'number' || this.params.compactModeThreshold < 0) this.params.compactModeThreshold = 100;
		if (typeof this.params.hiddenPositionOffset != 'number') this.params.hiddenPositionOffset = 0
		if (this.params.hideOnViewChangе !== false) this.params.hideOnViewChangе = true
		// other params default = false


		if (this.params.headerPositionFixed) {
			this.headerElem.classList.remove(this.names.stateStatic)
			this.headerElem.classList.add(this.names.stateFixed)
		} else {
			this.headerElem.classList.remove(this.names.stateFixed)
			this.headerElem.classList.add(this.names.stateStatic)
		}

		// Inner metrics
		this.headerHeight = this.headerPosition = this.headerOffset = 0;
		this.timeout = parseFloat(getComputedStyle(document.body).getPropertyValue(this.names.varTimer))*1000 || 0;

		// Init header parts
		if (this.params.menu) this.menu.init(this, this.names)
		// if (this.params.submenu) this.submenu.init(this, this.names)
		if (this.params.hidingHeader || this.params.hidingHeaderCompactMode) this.hidingHeader.init(this)

		this.initiated = true
	},
	calcHeaderHeight: function() {
		if (this.metrics) [this.headerHeight, this.headerPosition, this.headerOffset] = this.metrics.calcHeaderHeight()
	},
	setCssVar: function() {
		if (this.metrics) {
			this.metrics.headerHeight[0] = this.headerHeight
			this.metrics.headerPosition[0] = this.headerPosition
			this.metrics.headerOffset[0] = this.headerOffset
			this.metrics.setCssVar()
		}
	},
	checkViewportChange: function() {
		this.menu.toggle()
		this.menu.hideMenuOnViewChange()
		this.hidingHeader.returnHeader(true)
		this.hidingHeader.removeCompactMode()
	},
	scrollIntoView: function() {
		// scroll header (or window) down to prevent gap between header and menu (because menu doesn't know about header position)
		if (this.params.headerPositionFixed) this.hidingHeader.returnHeader(); // hidingHeader reference
		else window.scroll({top: 0, behavior: 'smooth'});
	},

	shareHeader: function() {
		if (!this.initiated) return;
		this.headerElem.classList.add(this.names.stateShared)
		this.headerElem.classList.add(this.names.stateSharedDelayed)
		this.scrollIntoView()
	},
	unshareHeader: function(timeout) {
		if (!this.initiated) return;
		this.headerElem.classList.remove(this.names.stateShared)
		setTimeout(function() {
			this.headerElem.classList.remove(this.names.stateSharedDelayed)
		}.bind(this), timeout);
	},

	// Menu
	menu: {
		// initiated: false,
		init: function(that, names) {
			this.root = that;
			if (this.root.metrics) this.menuElem = this.root.metrics.menuElem;
			else this.menuElem = this.root.headerElem.querySelector(names.menu);
			if (!this.menuElem) return;
			this.toggleButtons = this.root.headerElem.querySelectorAll(names.menuOpenBtn);
			this.closeButtons = this.root.headerElem.querySelectorAll(`${names.menuCloseBtn}, ${names.menuArea}`);
			// for (let btn of this.toggleButtons) {
			// 	btn.addEventListener('click', this.toggle.bind(this))
			// }
			// for (let btn of this.closeButtons) {
			// 	btn.addEventListener('click', this.toggle.bind(this))
			// }
			// this.initiated = true; // set before call 'hideMenuOnViewChange'
			this.hideMenuOnViewChangeTimeoutId = 321; // рандомный id чтобы вдруг не зацепить другие таймауты на старте
			this.hideMenuOnViewChange();

			this.onMenuOpen = this.root.params.onMenuOpen || function(){}
			this.onMenuClose = this.root.params.onMenuClose || function(){}
		},
		toggle: function(e, skipLock) {
			if (!this.initiated) return;
			if (this.menuElem.classList.contains(this.root.names.stateActive)) this.close(false, skipLock);
			else if (e) this.open(e, skipLock);
		},
		open: function(e, skipLock) {
			if (!this.initiated || window.innerWidth > this.root.away.getMobileBreakpoint()) return;
			if (!skipLock) {
				if (this.root.away.transitionIsLocked()) return;
				this.root.away.lockScroll()
			}
			this.root.away.closeOtherModules(true) // e.g. modal

			this.menuElem.classList.add(this.root.names.stateActive);
			this.root.headerElem.classList.add(this.root.names.stateActive);
			for (let btn of this.toggleButtons) {
				btn.classList.add(this.root.names.stateActive)
			}
			for (let btn of this.closeButtons) {
				btn.classList.add(this.root.names.stateActive)
			}
			this.root.scrollIntoView()
			this.onMenuOpen(this.root.timeout)
		},
		close: function(e, skipLock) {
			if (!this.initiated) return;
			if (!skipLock) {
				if (this.root.away.transitionIsLocked()) return;
				this.root.away.unlockScroll()
			}
			this.root.away.closeOtherModules(true) // e.g. modal
			// this.root.submenu.closeAll(); // submenu reference

			this.menuElem.classList.remove(this.root.names.stateActive);
			this.root.headerElem.classList.remove(this.root.names.stateActive);
			for (let btn of this.toggleButtons) {
				btn.classList.remove(this.root.names.stateActive)
			}
			for (let btn of this.closeButtons) {
				btn.classList.remove(this.root.names.stateActive)
			}
			this.onMenuClose(this.root.timeout)
		},
		hideMenuOnViewChange: function() {
			if (this.initiated && this.root.params.hideOnViewChangе) {
				clearTimeout(this.hideMenuOnViewChangeTimeoutId);
				this.hideMenuOnViewChangeTimeoutId = setTimeout(function(){
					if (window.innerWidth <= this.root.away.getMobileBreakpoint()) {
						this.menuElem.classList.remove(this.root.names.switchToMobile)
						this.menuElem.classList.add(this.root.names.switchToDesktop)
					}
					else {
						this.menuElem.classList.remove(this.root.names.switchToDesktop)
						this.menuElem.classList.add(this.root.names.switchToMobile)
					}
					this.root.calcHeaderHeight()
				}.bind(this), this.root.timeout)
			}
		}
	},
	// /Menu

}

