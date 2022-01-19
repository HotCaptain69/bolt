const Discord = require('discord.js');
const config = require("../config.js");
const fetch = require("node-fetch");
module.exports = (client, guild, message) => {



    let channel = client.channels.cache.get("921447396016287745");
  
    const embed = new Discord.MessageEmbed()
    .setTitle(`New Server!`)
    .setColor(`#19ec1d`)
    .setDescription(`Name & Id: **${guild.name}(\`${guild.id})\`**\nTotal Users: **${guild.memberCount}**
    Total servers :${client.guilds.cache.size}`)
    .setThumbnail(guild.iconURL());
     if (channel) channel.send(embed);
    
  } 
