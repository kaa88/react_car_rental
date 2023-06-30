import cities from './cities.json'

const LocationScript = {
	init({setInputValue}) {
		// this.setInputValue = setInputValue
	},
	getSearchList() {
		return cities || []
	},
	filterSearchList(value) {
		let valueRegExp = value.toLowerCase().trim()
		valueRegExp = '^' + valueRegExp
		valueRegExp = new RegExp(valueRegExp)
		let list = this.getSearchList()
		let filteredList = list.filter(item => valueRegExp.test(item.toLowerCase()))
		// console.log(filteredList);
		let sortedList = filteredList.sort((a, b) => a - b)
		return sortedList
	},
	// selectItem(e) {
	// 	this.setInputValue(e.target.textContent)
	// }
}

export default LocationScript