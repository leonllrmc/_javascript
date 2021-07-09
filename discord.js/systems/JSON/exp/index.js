const { writeFileSync, existsSync, exists } = require('fs')
const { Message } = require('discord.js')

/**
 * Système d'expérience global. C'est à dire que l'exp et le niveau de l'utilisateur sera commun à tout serveur.
 * Ne copiez pas bêtement le système, vous aurez du mal à le faire fonctionner. Ceci est là pour vous aider à comprendre comment faire.
 */
const global = {
	cooldowns: {},

	/** 
     * @param { Message } message 
     */
	run: function (message) {
		const ID = message.author.id // On récupère l'id de l'utilisateur au lieu de le demande à plusieurs reprises.

		// On check si le message est bien dans une guilde, si l'user n'est pas un bot, et si le cooldown, s'il existe, est bien passé.
		if (!message.guild || message.author.bot || (this.cooldowns[ID] && this.cooldowns[ID] - Date.now() > 0)) return

		const path = './database/users/' + ID + '.json' // On défini le chemin vers le fichier.json qui concene l'user.
		const data = existsSync(path) ? require(path) : { level: 0, exp: 0 } // Si le fichier existe, on récupère son contenu. Sinon créer un object tout neuf.
		const random = Math.ceil(Math.random() * 3) // On défini le nombre d'exp que la personne va gagner, ici c'est entre 1 et 3.
		const limit = (level + 1) * 20 // Ici on défini la limit d'exp à avoir pour le niveau

		// Si l'exp actuel + random est égale ou supérieure à la limite, alors cette condition est valide.
		if (data.exp + random >= limit) {
			++data.level // On incrémente data.level
			data.exp = data.exp + random - limit // On reset l'exp en rajoutant l'exp en supplément si le total avait dépasser la limite.
			message.reply('bien joué, vous êtes passer niveau: ' + data.level) // On signale à l'user qu'il a passé un niveau.
		} else data.exp += random // Si l'utilisateur n'a pas encore level up. On ajoute l'exp obtenu à son total d'exp actuel.

		writeFileSync(path, JSON.stringify(data)) // On sauvegarde les changements en reécrivant le fichier. Si le fichier n'existe pas, cela va le créer.
		this.cooldowns[ID] = Date.now() + 2e3 // On défini un cooldown de 2 secondes.
	}
}

/**
 * Système d'expérience par guilde. C'est à dire que l'exp et le niveau de l'utilisateur sera unique pour chaque guilde.
 * Ne copiez pas bêtement le système, vous aurez du mal à le faire fonctionner. Ceci est là pour vous aider à comprendre comment faire.
 */
const guild = {
	cooldowns: {},

	/** 
     * @param { Message } message 
     */
	run: function (message) {
		// On check si le message est bien dans une guilde, si l'user n'est pas un bot, et si le cooldown, s'il existe, est bien passé.
		if (!message.guild || message.author.bot || (this.cooldowns[message.guild.id + message.author.id] && this.cooldowns[message.guild.id + message.author.id] - Date.now() > 0)) return

		const path = './database/guilds/' + message.guild.id + '.json' // On défini le chemin vers le fichier.json qui concene la guilde.
		const data = existsSync(path) ? require(path) : {} // Si le fichier existe, on récupère son contenu. Sinon créer un object tout neuf.
		const user = data[message.author.id] || (data[message.author.id] = { level: 0, exp: 0 }) // Si le membre ne figure pas dans data, alors on le défini et on récupère son object. Si il figure bien, on le récupère.
		const random = Math.ceil(Math.random() * 3) // On défini le nombre d'exp que la personne va gagner, ici c'est entre 1 et 3.
		const limit = (level + 1) * 20 // Ici on défini la limit d'exp à avoir pour le niveau

		// Si l'exp actuel + random est égale ou supérieure à la limite, alors cette condition est valide.
		if (user.exp + random >= limit) {
			++user.level // On incrémente data.level
			user.exp = user.exp + random - limit // On reset l'exp en rajoutant l'exp en supplément si le total avait dépasser la limite.
			message.reply('bien joué, vous êtes passer niveau: ' + user.level) // On signale à l'user qu'il a passé un niveau.
		} else user.exp += random // Si l'utilisateur n'a pas encore level up. On ajoute l'exp obtenu à son total d'exp actuel.

		writeFileSync(path, JSON.stringify(data)) // On sauvegarde les changements en reécrivant le fichier. Si le fichier n'existe pas, cela va le créer.
		this.cooldowns[message.guild.id + message.author.id] = Date.now() + 2e3 // On défini un cooldown de 2 secondes.
	}
}
