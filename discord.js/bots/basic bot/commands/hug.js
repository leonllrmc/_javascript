const { Message } = require('discord.js')

const hugs = ['https://tenor.com/boXzB.gif', 'https://tenor.com/biszv.gif']

module.exports = {
	/** 
     * @param { object } param0  
     * @param { Message } [param0.message]  
     * @param { string[] } [param0.args]  
     */
	exec: ({ message, args }) => {
		const search = args.join(' ')
		const member = message.guild.members.cache.find((m) => m.id == search.replace(/\D+/g, '') || m.user.tag.toLowerCase().includes(search.toLowerCase()) || m.displayName.toLowerCase().includes(search.toLowerCase())) || message.member
		message.channel.send({ embed: { color: 'random', description: `❤ ${message.member} fait un calin à ${member}.`, image: { url: hugs[Math.floor(Math.random() * hugs.length)] } } })
	},
	options: { name: 'hug' }
}
