const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {   
  let embed = new Discord.RichEmbed()
      .setTitle("Help")
      .setDescription("Use `help <command>` for details.")
      .setColor(0xFF4500)
      .addField("🔢 Legend", "`<arg>` Compulsory argument\n`[arg]` Optional argument");
  
    let countersArr = [],
        utilityArr = [],
        categoryArr = [],
        otherArr = [];
        
    bot.cmdhelp.filter(cmd => cmd.category === 'Counters').forEach((cmd) => {countersArr.push(cmd.displName)});
    bot.cmdhelp.filter(cmd => cmd.category === 'Utility').forEach((cmd) => {utilityArr.push(cmd.displName)});
    bot.cmdhelp.filter(cmd => cmd.category === 'Category').forEach((cmd) => {categoryArr.push(cmd.displName)});
    bot.cmdhelp.filter(cmd => cmd.category === 'Other').forEach((cmd) => {otherArr.push(cmd.displName)});
  };

exports.help = {
  name: "help",
  category: "General",
  description: "Displays all the commands, or specify a command for details.",
  usage: "help [command]"
};