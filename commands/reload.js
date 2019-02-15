const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {   
  let embed = new Discord.RichEmbed()
    .setColor(0xFF4500);
  
  if (message.author.id != process.env.OWNER) {
    embed
      .setTitle("Permission Denied")
      .setDescription("You do not have permission to use this command. It is meant for other users.");
    
    return message.channel.send(embed);
  }

  client.loadCommands();
  
  embed
    .setTitle("Loading Commands...");
};

exports.help = {
  name: "reload",
  category: "Debug",
  description: "Reload all commands.",
  usage: "reload"
};