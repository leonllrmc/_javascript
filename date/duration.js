const times = [['année', 315576e5], ['mois', 2592e6], ['jour', 864e5], ['heure', 36e5], ['minute', 6e4], ['seconde', 1e3], ['milliseconde', 1]]

/**
 * Vous donnes le temps restant.
 * @param { Date } d 
 * @example
 * duration(new Date(1625667887673))
 * @returns { string }
 */
const duration = function (d) {
	if (!(d instanceof Date)) throw TypeError('Invalid argument')

	const date = Date.now() - d.getTime()
	const [text, ms] = times.find((time) => date > time[1])
	return Math.ceil(date / ms) + ' ' + (Math.ceil(date / ms) > 1.5 ? (text.endsWith('s') ? text : text + 's') : text)
}

/**
 * Version proto
 * @returns { string }
 */
Date.prototype.duration = function () {
	const date = Date.now() - this.getTime()
	const [text, ms] = times.find((time) => date > time[1])
	return Math.ceil(date / ms) + ' ' + (Math.ceil(date / ms) > 1.5 ? (text.endsWith('s') ? text : text + 's') : text)
}
