/* Example:
	setCookie(
		{
			name: '_cookies', // required
			value: 'true', // required
			path: '/ru' // default '/'
			expires: 30, // expire time in days (can be negative to delete cookie)
			// *any other supported params*
		},
		true // log formatted cookie string in console
	);
*/

export function setCookie(params = {}, log) {
	if (!params.name || !params.value) return console.error('Required cookie "name" or "value" is missing.');

	let cookieArr = [];
	cookieArr.push(encodeURIComponent(params.name) + '=' + encodeURIComponent(params.value));
	cookieArr.push('path=' + (params.path ? params.path : '/'));

	if (params.expires) {
		let d = new Date();
		d.setTime(d.getTime() + (params.expires*24*60*60*1000));
		cookieArr.push('expires=' + d.toUTCString());
	}

	Object.entries(params).forEach(([key, value]) => {
		if (!/name|value|path|expires/.test(key))
			cookieArr.push(key + (value ? ('=' + value) : ''))
	})

	let cookieStr = cookieArr.join('; ');
	document.cookie = cookieStr;
	if (log) console.log('Setting up cookie: ' + cookieStr);
}

export function getCookie() {
	const cookiesArr = decodeURIComponent(document.cookie).split('; ')
	return Object.fromEntries(cookiesArr.map((item) => item.split('=')))
}

export default {setCookie, getCookie}