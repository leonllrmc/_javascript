const { Client } = require('discord.js')
const { readdirSync, existsSync, lstatSync } = require('fs')

const client = new Client()

// Commands handler
client.commands = []
readdirSync('./commands').forEach((file) => {
	if (!lstatSync('./commands/' + file).isFile() && !file.endsWith('.js')) return
	client.commands.push(require('./commands/' + file))
})

// Events handler
readdirSync('./events').forEach((event) => {
	if (!lstatSync('./events/' + event).isDirectory()) return

	// Si le fichier index.js existe dans le dossier dans l'évent, alors le script le concidère comme le fichier principal et ne charge que lui.
	if (existsSync('./events/' + event + '/index.js')) client.on(event, (...params) => require('./events/' + event + '/index.js')({ client, params }))
	else client.on(event, (...params) => readdirSync('./events/' + event).forEach((file) => lstatSync('./events/' + event + '/' + file).isFile() && file.endsWith('.js') && require('./events/' + event + '/' + file)({ client, params })))
	// Sinon, si il n'y a pas de fichier principal. Il va chargé tout les fichiers.js disponible dans le dossier de l'event.
})

client.login('token')
