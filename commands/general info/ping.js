const Discord = module.require("discord.js");
const client = new Discord.Client();

module.exports = {
  name: "ping",
  aliases: [],
  execute: async(client, message, args, data, db) => {
    
const im = new Discord.MessageEmbed()
    .setTitle('Ping')
    .setColor('RANDOM')
    .addField("Bot ping:", + `${Math.floor(Date.now() - message.createdTimestamp)}` + "ms")
    .addField('My Api ping:', + `${Math.floor(client.ws.ping)}` + 'ms')
    message.channel.send(im)
  }
}
module.exports.help = {
    name: "ping",
    description: "Gets a ping",
    usage: "ping",
    type: "General"
}