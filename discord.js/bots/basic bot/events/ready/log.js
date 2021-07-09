const { Client } = require('discord.js')

/** 
 * @param { object } param0 
 * @param { Client } [param0.client]  
 */
module.exports = ({ client }) => console.log(client.user.username + ' est en ligne.')
