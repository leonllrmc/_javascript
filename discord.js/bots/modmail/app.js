const { Client } = require('discord.js')
const { writeFileSync } = require('fs')
const _tickets = require('./_tickets.json') // JSON ou sont stockés tout les tickets

const support = ['staffRoleID', 'staffRoleID', 'staffUserID'] // ID des roles et users qui seront autorisé à voir le ticket
const parent = 'parentID' // Catégorie ou seront créer les tickets
const guildID = ''
const prefix = '!' // Prefix du bot

const client = new Client({ partials: ['CHANNEL', 'USER'] })

client.on('ready', () => console.log('En ligne !')).on('message', (message) => {
	if (message.author.bot) return
	const guild = client.guilds.cache.get(guildID) // Récupération de votre guilde

	// Si le message est envoyé dans votre guilde
	if (message.guild) {
		const ticket = _tickets.find(({ channel }) => channel === message.channel.id) // Récupération du ticket lié au salon
		const command = message.content.split(/\s+/g)[0] // Récupération de la commande

		// Si le tickect existe bien et que la commande commence par le prefix
		if (ticket && command.startsWith(prefix)) {
			const user = client.users.cache.get(ticket.user) // Récupération de l'user lié au ticket
			switch (command) {
				// commande pour répondre au ticket
				case prefix + 'rep':
					// Si l'user est encore en contact avec le bot
					if (user) {
						// Envoies des messages
						if (message.content) user.send(message.content).catch(() => message.channel.send("L'utilisateur n'a pas pu recevoir le message."))
						if (message.attachments.size) user.send(message.attachments.array()).catch(() => message.channel.send("L'utilisateur n'a pas pu recevoir le message."))
						message.react('💌')
					} else message.channel.send("L'utilisateur n'est plus sur le serveur.") // Si l'user n'est plus en contact avec le bot
					break

				// commande pour fermer le ticket
				case prefix + 'close':
					if (user) user.send('Le ticket a été fermer.').catch(() => null)
					_tickets.splice(_tickets.findIndex(({ channel }) => channel === message.channel.id)) // Supprimes le ticket du JSON
					writeFileSync('./_tickets.json', JSON.stringify(_tickets)) // Save les changements
					break
			}
		}
	} else {
		const ticket = _tickets.find(({ user }) => user === message.author.id) // Récupération du ticket lié à l'user

		// Si le ticket existe bien
		if (ticket) {
			const channel = guild.channels.cache.get(ticket.channel) // Récupération du channel lié au ticket
			if (channel) {
				// Envoies des messages
				if (message.content) channel.send(message.content)
				if (message.attachments.size) channel.send(message.attachments.array())
				message.react('💌')
			} else message.channel.send('Une erreur est survenue.') // Si le salon n'existe plus
		} else {
			// Si le ticket n'existe pas

			// Demande de confirmation
			message.channel.send("Êtes vous sur d'ouvrir un ticket avec cette raison ?").then(async (confirm) => {
				await confirm.react('⭕')
				await confirm.react('❌')

				// Collecteur de réactions
				confirm.awaitReactions((react, user) => !user.bot && ['⭕', '❌'].includes(react.emoji.name), { limit: 1, time: 6e4 }).then((collected) => {
					if (!collected.size || collected.first().emoji.name === '❌') return confirm.edit('Demande annulée.') // Si rien n'est reçu ou si l'user clique sur la X

					// Création du salon du ticket sur le serveur
					guild.channels.create(message.author.username, { parent, permissionOverwrites: [{ id: guild.roles.everyone, deny: ['VIEW_CHANNEL'] }, ...support.map((id) => ({ id, allow: ['VIEW_CHANNEL', 'EMBED_LINKS', 'ATTACH_FILES'] }))] }).then((channel) => {
						message.channel.send('Demande envoyée.') // Message de confirmation
						channel.send({ embed: { description: message.content, author: { name: message.author.tag, icon_url: message.author.defaultAvatarURL({ dynamic: true }) } } })
						_tickets.push({ user: message.author.id, channel: channel.id, date: Date.now() }) // Envoies du ticket dans le JSON
						writeFileSync('./_tickets.json', JSON.stringify(_tickets)) // Sauvegarde des changements
					})
				}, () => null)
			})
		}
	}
})

client.login('token')
