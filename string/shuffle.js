/**
 * Randomise l'emplacement des caractères dans un string.
 * @param { string } str
 * @returns { string }
 */
const shuffle = function (str) {
	if (typeof str !== 'string') throw TypeError('Invalid type')
	// Transforme le string en tableau, pour ensuite trier de façon aléatoire avec le .sort()
	return [...str].sort(() => Math.random() - 0.5).join('')
}

/**
 * La version proto.
 * @returns { string }
 */
String.prototype.shuffle = function () {
	return [...this].sort(() => Math.random() - 0.5).join('')
}
