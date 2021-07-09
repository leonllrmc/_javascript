const { Client, Message } = require('discord.js')

const cooldowns = {} // Stockage de tout les cooldowns.
const prefix = '!' // Votre prefix.

/** 
 * @param { object } param0 
 * @param { Client } [param0.client] 
 * @param { [Message] } [param0.params] 
 */
module.exports = ({ client, params: [message] }) => {
	if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return
	const [command, ...args] = message.content.slice(prefix.length).toLowerCase().split(/\s+/g) // On récupère la commande et les arguments.
	const expt = client.commands.find(({ options }) => [options.name, ...(options.aliases || [])].includes(command)) // On cherche la commande dans notre tableau de commandes.

	if (expt) {
		const key = message.author.id + expt.options.name
		if (cooldowns[key] && cooldowns[key] - Date.now() > 0) return message.channel.send('Vous devez encore attendre **' + Math.ceil(cooldowns[key] - Date.now()) / 1000 + '** secondes.')
		expt.exec({ client, message, prefix, command, args }) // On execute la commande.
		cooldowns[key] = Date.now() + (expt.options.cooldown || 1) * 1e3 // On défini le cooldown de la commande.
	}
}

// Ceci est une fonction qui va reset toute les deux heures le contenu de cooldowns. Pour éviter que celui ci ne prenne trop de mémoire.
const reset = () => {
	const date = Date.now()
	for (const [key, value] of Object.entries(cooldowns)) if (value - date > 0) delete cooldowns[key]
	setTimeout(reset, 72e5)
}

reset()
