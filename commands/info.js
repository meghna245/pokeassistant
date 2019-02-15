const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {   
  let embed = new Discord.RichEmbed()
    .setTitle("Information")
    .setColor(0xFF4500)
    .setDescription("PokeAssistant is a bot aimed to help Pokecord players. It will tell you what Pokemon it is whenever Pokecord spawns one. As such, you no longer have to rack your brains or even search Google. Sometimes, you may just miss a rare Pokemon like this.")
    .addField("Creators", "<@446290930723717120> and <@379956316275343372>")
    .addField("How does it work?", "All the images from Pokecord are hashed into short strings, and stored in our database. When Pokecord spawns a Pokemon, PokeAssistant will hash it, then compare with the database and retrieve the name of the Pokemon.")
    .addField("Bot is blacklisted?", "Don't worry, creating bots are easy. Join our official server to invite a new bot, and always get the latest the announcements.")
    .addField("You're miles, or a moderatorof Pokecord?", "Come drop me a DM.")
    .addField("Bot invite link", "https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8")
    .addField("Server invite link", "https://discord.gg/TYe3U4w");
};

exports.help = {
  name: "info",
  category: "General",
  description: "Get some information about me.",
  usage: "info"
};