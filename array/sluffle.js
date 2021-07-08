/**
 * Randomise un array
 * @param { *[] } arr 
 * @returns { *[] }
 */
const shuffle = function (arr) {
	if (!Array.isArray(arr)) throw TypeError('Invalid argument')

	return arr.sort(() => Math.random() - 0.5)
}

/**
 * Version proto
 * @returns 
 */
Array.prototype.shuffle = function () {
	return this.sort(() => Math.random() - 0.5)
}
