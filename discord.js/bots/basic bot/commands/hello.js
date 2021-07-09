const { Message } = require('discord.js')

module.exports = {
	/** 
     * @param { object } param0  
     * @param { Message } [param0.message]  
     */
	exec: ({ message }) => message.reply('world !'),
	options: { name: 'hello', aliases: ['hi'], cooldown: 2 }
}
