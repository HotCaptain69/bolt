const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require("quick.db");

module.exports = {
  name: "help",
  aliases: ['h', 'helppls'],
  description: "Shows all available bot commands.",
  execute: async (client, message, args) => {

    var prefix = db.fetch(`guildprefix_${message.guild.id}`);
    if (!prefix) {
      var prefix = ".";
    }
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];
      var commandnum = [];
      readdirSync("./commands/").forEach((dir, files) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
    
        );

        const cmds = commands.map((command) => {
        
          let file = require(`../../commands/${dir}/${command}`);
          
          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });
 
        let data = new Object();
        let data1 = new Object();
       
        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(", "),
        };

        categories.push(data);

      });

   let commandscount = "214";

      const embed = new MessageEmbed()
        .setTitle(`📬 Need help? Here are all of my commands:\n Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`)



        .addField("** <a:dc_mod:932272341533216829>  BOT CODE INFO**", "`dependencies`, `modules`, `servers`, `stats`, `uptime`\n\**<a:spy_lastwarning:932272525046607983>  GENERAL INFO**\n`djs`, `help`, `invite`, `links`, `ping`, `serverstats`, **`privacy`**\n\n** <a:dev:927212995514335323> ** **OWNERS**\n`shell`, `control`, `eval`, `usage`\n\n  <:PZ73_codm_guessiwill:932270090009866351>   **Guessing Games** \n `find-words`, `guess-number`, `lovecalc`\n\n **<:goldmod:932273721203367966> Anti Bad Words**\n `anti-badwords`")


        .addField("**  <:Modbadge:932270289910366220>  AUTOMOD**", "`anti-alt`, `antilink`, `autonick`, `auto-official-role`, `auto-official-role-disable`, `autorole`, `role-all`\n\n**<a:H_laughh1:932272728478740510>  FUN**\n`afk`, `animesearch`, `ascii`, `baka`, `beep`, `dumb`, `calc`, `cattext`, `dice`, `eightball`, `flipcoin`, `fliptext`, `hack`, `iq`, `joke`, `kill`, `messages`, `poke`, `poll`, `ratewaifu`, `rps`, `sneeze`, `waifu`, `youtube`, `zalgo`\n\n ** <a:ff_fbiopen:932273219698831451> Information Of People**\n `Profile`\n\n **<a:Verified:932273478046986322> Biography**\n `set-bio`, `bio-reset`, `check-bio`\n\n **<a:gamer1:927213466450812928> Custom Commands**\n `cc-create`, `cc-delete`, `cc-list`")


        .addField("**<a:level_up:932272142370897921>LEVEL**", "`rank`\n\n**<a:log:927212646346932325> LOGS**\n`logs-ticket`, `set-logs`, `remove-logs`\n\n**<a:Blg_WhiteMusic:932272961539428412> MUSIC**\n`24/7`, `bassboost`, `dc`, `connect`, `lyrics`, `np`, `pause`, `play`, `queue`, `resume`, `shuffle`, `skip`, `stop`, `volume`\n\n** <a:bug:926496483841286194>  REPORT**\n`suggest`, `bug-report`")


        


        .addField("**  <a:Msg_rply_do:932272000704065536> TICKET**", "`add`, `close`, `delete`, `new`, `open`, `remove`, `setup`\n\n**  <a:RNX__mixed_reaction:932271019627008030> REACTION ROLES**\n`reaction-role`, `reaction-role-remove`\n\n**  <a:Gamer:926513687215345684> GAMES**\n`csgo`, `poke`, `slots`, `tictactoe`\n\n**  <a:n_PictureClick:932271618431025213> IMAGE**\n`3000yr`, `approved`, `batslap`, `beautiful`, `brazzers`, `burn`, `cat`, `challenger`, `cuddle`, `dict`, `distort`, `dog`, `meme`, `flatearth`, `meme`, `qrcode`, `randomav`, `rip`, `scary`, `slap`, `triggered`, `tickle`, `tweet`, `vs`, `wanted`")


        .addField("** <:modd:932271343053963375>  MODERATION**", "`announce`, `ban`, `color`, `hide`, `kick`, `lock`, `maintainence`, `nuke`, `prune`, `purge`, `say`, `sendembed`, `serverlock`, `serverunlock`, `set`, `slowmode`, `stealemoji`, `unban`, `unhide`, `unlock`, `vcid`, `voicedeafen`, `voicekick`, `voicemove`, `voicemute`, `voiceundeaf`, `voiceunmute`, `warn`, `warns`\n\n**  <a:Chat_revive:932270644689780756> CHATBOT**\n`remove-channel`, `set-channel`\n\n** <a:pc:927212470991478806> UTILITY**\n`avatar`, `covid`, `id`, `members`, `roleid`, `github`, `servericon`, `time`, `info`, `weather`")
        .addField("**<a:Miku_Welcome:926801729440333854> Welcome and Leave**", "`set-welcome`, `leave`, `welcome`, `set-leave`")

      

        .setFooter(
          `Requested by ${message.author.tag} | Total ${commandscount} Commands`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands! (Some Commands will show on help And they are working just Command is disabled in detaied help command)`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.help.usage}}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.help.description
            ? command.help.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
          
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};

      //made by aditya codez