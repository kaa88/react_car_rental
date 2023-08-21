import cities from './cities.json'

const LocationScript = {
	init() {},
	getSearchList() {
		return cities || []
	},
	filterSearchList(value) {
		let valueRegExp = value.toLowerCase().trim()
		valueRegExp = '^' + valueRegExp
		valueRegExp = new RegExp(valueRegExp)
		let list = this.getSearchList()
		let filteredList = list.filter(item => valueRegExp.test(item.toLowerCase()))
		let sortedList = filteredList.sort((a, b) => a - b)
		return sortedList
	},
}

export default LocationScript