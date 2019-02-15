const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {   
  let embed = new Discord.RichEmbed()
    .setTitle("Invite")
    .setColor(0xFF4500)
    .setDescription("You can invite me to your server with this link:\nhttps://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8");

  message.channel.send(embed);
};

exports.help = {
  name: "invite",
  category: "General",
  description: "Get a link to invite me to your server.",
  usage: "invite"
};