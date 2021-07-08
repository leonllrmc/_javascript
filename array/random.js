/**
 * Renvoie un élément random du array
 * @param { *[] } arr 
 * @returns { * }
 */
const random = function (arr) {
	if (!Array.isArray(arr)) throw TypeError('Invalid argument')

	return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Version proto
 * @returns { * }
 */
Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)]
}
