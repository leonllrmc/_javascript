const { Client } = require('discord.js')
const { writeFileSync } = require('fs')
const _afk = require('./afk.json')

const client = new Client()

client.on('message', (message) => {
	if (!message.guild || message.author.bot) return

	const data = _afk[message.author.id]
	if (data) {
		// Envoie d'un message quand l'user n'est plus afk.
		message.channel.send(`${message.author} n'est plus afk.`)
		delete _afk[message.author.id] // Supprimes l'user du json
		writeFileSync('./afk.json', JSON.stringify(_afk)) // Sauvegarde des changements
	}

	const members = message.mentions.members.filter((member) => _afk[member.id]) // Filtre les membres afk dans les mentions du message
	// Si il y a plus d'un membre afk, alors...
	if (members.size > 1) message.channel.send(`Les membres: \`${members.map((member) => member.user.tag).join(', ')}\` sont afk.`)
	else if (members.size) {
		// Si il y a un seul membre afk, alors...
		const member = members.first()
		message.channel.send(`Le membre \`${member.user.username}\` est afk pour la raison: ${_afk[member.id].reason}.`)
	}

	// Commande pour ce mettre afk
	if (message.content.startsWith('!afk')) {
		const content = message.content.slice(5) // Découpe du contenu du message en retirant la commande
		const reason = content.length ? content : 'Aucune raison spécifiée' // Définition de la reason de l'afk
		message.channel.send('Vous êtes désormais afk, si vous envoyez un message: le mode afk sera retiré.') // Envoie d'un message de confirmation
		_afk[message.author.id] = { reason, date: Date.now() } // Déclaration de l'afk dans l'object
		writeFileSync('./afk.json', JSON.stringify(_afk)) // Sauvegarde des changements
	}
})

client.login('token')
