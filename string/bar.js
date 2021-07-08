/** 
 * Créer une barre de progression avec des caractères.
 * @param { string } str 
 * @param { string } empty 
 * @param { string } full 
 * @param { number } max 
 * @param { number } number 
 * @returns { string }
 */
const bar = function (str, empty, full, max, number) {
	return ''.padEnd(Math.ceil(str.length / max * 100 * (number / 100)), full).padEnd(number, empty)
}
