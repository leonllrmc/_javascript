const array = ['y', 'z', 'e', 'p', 't', 'g', 'm', 'k']

/**
 * Mets en forme les nombres: 75000 > 75k
 * @param { number } num 
 * @returns { string }
 */
const form = function (num) {
	if (typeof num !== 'number') throw TypeError('Invalid argument')

	let [value, y] = [num, 0]
	for (let i = 24; i > 0; i = i - 3) {
		if (value >= 10 ** i) return ((value / 10 ** i).toFixed(1).toString().includes('.0') ? (value / 10 ** i).toFixed(0) : (value / 10 ** i).toFixed(1)) + array[y]
		else y++
	}

	return value.toString()
}

/**
 * Version proto
 * @returns { string }
 */
Number.prototype.form = function () {
	let [value, y] = [this, 0]
	for (let i = 24; i > 0; i = i - 3) {
		if (value >= 10 ** i) return ((value / 10 ** i).toFixed(1).toString().includes('.0') ? (value / 10 ** i).toFixed(0) : (value / 10 ** i).toFixed(1)) + array[y]
		else y++
	}

	return value.toString()
}
