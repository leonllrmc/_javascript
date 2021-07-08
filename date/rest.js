/**
 * Donnes les ms de Date.now() à 00h
 * @param { Date } date 
 * @returns { number }
 */
const rest = function (date) {
	if (!(date instanceof Date)) throw TypeError('Invalid argument')

	return (23 - date.getHours()) * 36e5 + (59 - date.getMinutes()) * 6e4 + (59 - date.getSeconds()) * 1e3 + date.getMilliseconds()
}

/**
 * Version proto
 * @returns { number }
 */
Date.prototype.rest = function () {
	return (23 - this.getHours()) * 36e5 + (59 - this.getMinutes()) * 6e4 + (59 - this.getSeconds()) * 1e3 + this.getMilliseconds()
}
