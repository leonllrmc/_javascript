const months = { full: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'], half: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Nov', 'Déc'] }
const days = { full: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'], half: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] }

/**
 * Mets en forme une Date
 * @param { Date } date 
 * @param { string } form 
 * @returns { string }
 */
const format = function (date, form) {
	if (!(date instanceof Date)) throw new Error('Invalid argument')
	if (typeof form != 'string') throw new Error('Invalid argument')

	const marks = {
		YYYY: date.getFullYear().toString(),
		YY: date.getUTCFullYear().toString().slice(2),

		MMMM: months.full[date.getMonth()],
		MMM: months.half[date.getMonth()],
		MM: date.getMonth().toString().padStart(2, '0'),
		M: date.getMonth().toString(),

		DDDD: days.full[date.getDay()],
		DDD: days.half[date.getDay()],
		DD: date.getDate().toString().padStart(2, '0'),
		D: date.getDate().toString(),
		d: date.getDay().toString(),

		hh: date.getHours().toString().padStart(2, '0'),
		h: date.getHours().toString(),

		mm: date.getMinutes().toString().padStart(2, '0'),
		m: date.getMinutes().toString(),

		ss: date.getSeconds().toString().padStart(2, '0'),
		s: date.getSeconds().toString(),

		ms: date.getMilliseconds().toString()
	}

	return form.replace(/YYYY|YY|MMMM|MMM|MM|M|DDDD|DDD|DD|D|d|hh|h|mm|m|ss|s|ms/g, (str) => marks[str])
}

/**
 * Version proto
 * @param { string } form 
 * @returns { string }
 */
Date.prototype.format = function (form) {
	if (typeof form != 'string') throw new Error('form must be a string')

	const marks = {
		YYYY: this.getFullYear().toString(),
		YY: this.getUTCFullYear().toString().slice(2),

		MMMM: months.full[this.getMonth()],
		MMM: months.half[this.getMonth()],
		MM: this.getMonth().toString().padStart(2, '0'),
		M: this.getMonth().toString(),

		DDDD: days.full[this.getDay()],
		DDD: days.half[this.getDay()],
		DD: this.getDate().toString().padStart(2, '0'),
		D: this.getDate().toString(),
		d: this.getDay().toString(),

		hh: this.getHours().toString().padStart(2, '0'),
		h: this.getHours().toString(),

		mm: this.getMinutes().toString().padStart(2, '0'),
		m: this.getMinutes().toString(),

		ss: this.getSeconds().toString().padStart(2, '0'),
		s: this.getSeconds().toString(),

		ms: this.getMilliseconds().toString()
	}

	return form.replace(/YYYY|YY|MMMM|MMM|MM|M|DDDD|DDD|DD|D|d|hh|h|mm|m|ss|s|ms/g, (str) => marks[str])
}
