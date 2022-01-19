const Discord = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db");

module.exports = {
  name: "bio-set",
  aliases: ['set-bio', 'biography-set'],
  description: "Shows all available bot commands.",
  execute: async (client, message, args) => {
   let tosave = args.join(" ");
   if(!args[0]){
     var errembed = new Discord.MessageEmbed()
    .setDescription("📛 **Failed** 📛")
    .addField("Error:", `You Didnt Gave me A Bio to Set`)
     return message.channel.send(errembed)
   }
   if(tosave.length > 40) {
       var errembed = new Discord.MessageEmbed()
    .setDescription("📛 **Failed** 📛")
    .addField("Error:", `Your Bio is Too Long. We dont allow More than 40 Character in Biography`)
     return message.channel.send(errembed)
   }
   db.set(`biography_${message.author.id}`, tosave);

   const aembed = new Discord.MessageEmbed()
   .setDescription("💎**Successfull** 💎")
   .addField("Bio to Set:", tosave)
   message.channel.send(aembed);

  }
}