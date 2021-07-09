const { Client } = require('discord.js')

/** 
 * @param { object } param0 
 * @param { Client } [param0.client]  
 */
module.exports = ({ client }) => {
	// On créer une fonction qui s'executera en boucle.
	const refresh = () => {
		const activities = [{ name: 'un robot', type: 'WATCHING' }] // On défini nos différentes activités.
		client.user.setPresence({ status: 'online', activity: activities[Math.floor(Math.random() * activities.length)] }) // On redéfini la présence du bot.
		setTimeout(refresh, 6e4) // On lance un petit timeout d'une minute qui relancera la fonction une fois le temps écoulé.
	}

	refresh() // On lance la fonction
}
