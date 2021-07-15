const Discord = require('discord.js');
const nodeHtmlToImage = require('node-html-to-image');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const client = new Discord.Client();

const isHTML = require('is-html');


client.on('ready', () => {
    client.user.setActivity("leonllrYT on youtube (Use >help for commands list)", { type: "WATCHING", url: "https://www.youtube.com/channel/UCrdyvr6SsHIZd03T2xWAhag" })
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message',  async(msg) => {
    if (msg.content.startsWith('>help')) {
        var helpEmbed = new Discord.MessageEmbed()
            .setColor('#2bff00')
            .setTitle('help')
            .addFields(
                {name: '>invite', value: 'Display Bot Invite'},
                {
                    name: '[message with HTML content]',
                    value: 'Display HTML content from message in a image'
                },
                {
                    name: '>devtools [message with HTML content]',
                    value: 'Display HTML content from message in a image and devtools will be opened'
                }
            )
        msg.channel.send(helpEmbed)
        /*}else if(msg.content.startsWith(`<@!${client.user.tag}>`)) {
            msg.reply(`Hey <@${msg.author.id}> you can use \`>help\` to learn to use my powers !`)
        */
        log('getted help',msg)
    }else if (msg.content.startsWith('>invite')) {
        var inviteEmbed = new Discord.MessageEmbed()
            .setColor('#2bff00')
            .setTitle('https://discord.com/api/oauth2/authorize?client_id=814912983993548821&permissions=1074063424&scope=bot')
        msg.channel.send(inviteEmbed)
        /*}else if(msg.content.startsWith(`<@!${client.user.tag}>`)) {
            msg.reply(`Hey <@${msg.author.id}> you can use \`>help\` to learn to use my powers !`)
        */
        log('getted invite',msg)
    }else if (msg.content.startsWith('>devtools')) {
        if (isHTML(msg.content.toString().substr(9, msg.content.length - 1))) {
            console.log('new message that is HTML')
            try {
                msg.react(client.emojis.cache.find((emoji) => emoji.name === 'load'))
                var $ = cheerio.load(msg.content.toString().substr(9, msg.content.length - 1));
                var title = $("title").text();

                var images = await nodeHtmlToImage({
                    html: msg.content.toString().substr(8, msg.content.length - 1) || '',
                    quality: 100,
                    type: 'jpeg',
                    puppeteerArgs: {
                        devtools: true,
                        args: ['--no-sandbox']
                    },
                    encoding: 'buffer'
                })


                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle(title || '')
                    .attachFiles(new Discord.MessageAttachment(images, 'htmlImage.jpg'))
                    .setImage('attachment://htmlImage.jpg'));

                msg.reactions.removeAll();
                log(`getted html: ${msg.content.toString().substr(9, msg.content.length - 1)}`,msg)
            } catch (error) {
                console.error(error)
                /*let errorEmbed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('something whent wrong...')
                    .setDescription(error.toString())
                    .setTimestamp()
                msg.reply(errorEmbed);*/
            }
        }
    }else if (msg.content.startsWith('>botInfos')){
        if(!msg.author.bot || !msg.author.tag == 'leonllrYT#7274' || !(msg.guild.id == '783967689852715038' && msg.author.roles.cache.has('783985585357717514'))) return msg.reply('access denied :( (only wumpus has it)');
        (async (message) => {
            let totalMembers = 0

            for (const guild of this.client.guilds.cache) {
                totalMembers += (await guild[1].members.fetch()).size
            }

            const embed = new MessageEmbed()
                .setAuthor(
                    `Information about the ${this.client.user.username} Bot`,
                    this.client.user.displayAvatarURL()
                )
                .addFields(
                    {
                        name: 'Bot tag',
                        value: this.client.user.tag,
                    },
                    {
                        name: "Server's command prefix",
                        value: message.guild.commandPrefix,
                    },
                    {
                        name: 'Time since last restart',
                        value: `${process.uptime().toFixed(2)}s`,
                    },
                    {
                        name: 'Server count',
                        value: this.client.guilds.cache.size,
                    },
                    {
                        name: 'Total members',
                        value: totalMembers,
                    },
                    {
                        name: 'client',
                        value: JSON.stringify(client)
                    },
                    {
                        name: 'process',
                        value: JSON.stringify(process)
                    }
                )

            message.channel.send(embed)
        })
    }else if (msg.content.startsWith('>fromUrl')) {
        try {
            var tmp = msg.channel.send('fetching file from Spatial Network...')
            msg.react(client.emojis.cache.find((emoji) => emoji.name === 'load'))
            //if (file && (file.name.substr(file.name.lenght - 4,file.name.lenght - 1) == '.txt'||file.name.substr(file.name.lenght - 5,file.name.lenght - 1) == '.html')) {
            fetch(msg.content.toString().substr(8, msg.content.length - 1)).then(data => data.text()).then(async (data) => {
                (await tmp).delete()
                //if(isHTML(replaceAll(replaceAll(replaceAll(data.toString(),'  ',''),' ',''),'\n',''))) {
                var fetchedInfo = await msg.channel.send('fetched file from Spatial network')

                var $ = cheerio.load(data.toString());
                var title = $("title").text();

                var images = await nodeHtmlToImage({
                    html: data.toString() || '<div></div>',
                    quality: 180,
                    waitUntil: 'load',
                    type: 'jpeg',
                    puppeteerArgs: {
                        devtools: devtools||false,
                        args: ['--no-sandbox']
                    },
                    encoding: 'buffer'
                })
                fetchedInfo.edit('generated image')
                if(title.split('').length > 255) title = null;
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle(title || '')
                    .attachFiles(new Discord.MessageAttachment(images, 'htmlImage.jpg'))
                    .setImage('attachment://htmlImage.jpg'));
                fetchedInfo.delete()

                msg.reactions.removeAll();
                log(`getted from URL: ${msg.content.toString().substr(8, msg.content.length - 1)}`,msg)
                //}
                //}
            }).catch((e) => {
                console.error(e)
            })
        } catch (e) {
            console.error(e)
        }
    } else if (msg.attachments.size < 1) {
        if (isHTML(msg.content.toString())) {
            console.log('new message that is HTML')
            try {
                msg.react(client.emojis.cache.find((emoji) => emoji.name === 'load'))
                var $ = cheerio.load(msg.content.toString());
                var title = $("title").text();
                console.log("title: " + title || "no title")

                var images = await nodeHtmlToImage({
                    html: msg.content.toString() || '',
                    quality: 100,
                    type: 'jpeg',
                    puppeteerArgs: {
                        devtools: false,
                        args: ['--no-sandbox']
                    },
                    encoding: 'buffer'
                })
                console.log("image generated")
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle(title || '')
                    .attachFiles(new Discord.MessageAttachment(images, 'htmlImage.jpg'))
                    .setImage('attachment://htmlImage.jpg'));

                msg.reactions.removeAll();
                log(`getted html: ${msg.content.toString()}`,msg)
            } catch (error) {
                console.error(error)
                /*let errorEmbed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('something whent wrong...')
                    .setDescription(error.toString())
                    .setTimestamp()
                msg.reply(errorEmbed);*/
            }
        } else if (msg.attachments.size <= 0) {
            try {
                var file = msg.attachments.array()[0]
                if(!file) return
                msg.react(client.emojis.cache.find((emoji) => emoji.name === 'load'))
                var tmp = msg.channel.send('fetching file from Discord Network...')
                //if (file && (file.name.substr(file.name.lenght - 4,file.name.lenght - 1) == '.txt'||file.name.substr(file.name.lenght - 5,file.name.lenght - 1) == '.html')) {
                fetch(file.url).then(data => data.text()).then(async (data) => {
                    (await tmp).delete()
                    //if(isHTML(replaceAll(replaceAll(replaceAll(data.toString(),'  ',''),' ',''),'\n',''))) {
                    var fetchedInfo = await msg.channel.send('fetched file from discord network')
                    var $ = cheerio.load(data.toString());
                    var title = $("title").text();

                    var images = await nodeHtmlToImage({
                        html: data.toString() || '<div></div>',
                        quality: 180,
                        waitUntil: 'load',
                        type: 'jpeg',
                        puppeteerArgs: {
                            devtools: false,
                            args: ['--no-sandbox']
                        },
                        encoding: 'buffer'
                    })
                    fetchedInfo.edit('generated image')
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle(title || '')
                        .attachFiles(new Discord.MessageAttachment(images, 'htmlImage.jpg'))
                        .setImage('attachment://htmlImage.jpg'));
                    fetchedInfo.delete()

                    msg.reactions.removeAll();
                    log(`getted from file (url: ${file.url})`,msg)
                    //}
                    //}
                }).catch((e) => {
                    console.error(e)
                })
            } catch (e) {
                console.error(e)
            }
        }
    }
})

function log(text,msg) {
    const logEmbed = new Discord.MessageEmbed().setTitle('Html Embed creator log').setAuthor(msg.author.username).setContent(text).setColor('#00c3ff')
  client.channels.cache.get('846034305850277949').send(logEmbed)
}

client.login("DON'T STEAL MY TOKEN");
