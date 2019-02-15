const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {   
  let embed = new Discord.RichEmbed()
      .setTitle("Help")
      .setDescription("Use `help <command>` for details.")
      .setColor(0xFF4500)
      .addField("🔢 Legend", "`<arg>` Compulsory argument\n`[arg]` Optional argument");
  
  
};

exports.help = {
  name: "help",
  category: "General",
  description: "Displays all the commands, or specify a command for details.",
  usage: "help [command]"
};