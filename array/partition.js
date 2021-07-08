/**
 * Envoie les éléments qui sont vrai dans le premier array, et les autres dans le second.
 * @param { *[] } arr 
 * @param { function } funct La fonction qui filtre
 * @returns { [*[], *[]] }
 */
const partition = function (arr, funct) {
	if (!Array.isArray(arr)) throw new Error('Invalid argument')
	if (typeof funct != 'function') throw new Error('Invalid argument')

	const [a, b] = [[], []]
	for (let i = 0; i < arr.length; i++) funct(arr[i], i, arr) ? a.push(arr[i]) : b.push(arr[i])
	return [a, b]
}

/**
 * Version proto
 * @returns { [*[], *[]] }
 */
Array.prototype.partition = function (funct) {
	if (typeof funct != 'function') throw new Error('Invalid argument')

	const [a, b] = [[], []]
	for (let i = 0; i < this.length; i++) funct(this[i], i, this) ? a.push(this[i]) : b.push(this[i])
	return [a, b]
}
