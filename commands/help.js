const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {   
  let embed = new Discord.RichEmbed()
      .setTitle("Help")
      .setDescription("Use `help <command>` for details.")
      .setColor(0xFF4500)
      .addField("🔢 Legend", "`<arg>` Compulsory argument\n`[arg]` Optional argument");
  
  let generalArr = [],
      debugArr = [];
      //otherArr = [];
        
  client.cmdhelp.filter(cmd => cmd.category === "General").forEach((cmd) => {generalArr.push(cmd.name)});
  client.cmdhelp.filter(cmd => cmd.category === "Debug").forEach((cmd) => {debugArr.push(cmd.name)});
  //client.cmdhelp.filter(cmd => cmd.category === 'Other').forEach((cmd) => {otherArr.push(cmd.name)});
  
  embed
    .addField("General", generalArr.map(g => g).join('\n'), true);
  
  if (!args[0]) {
    message.channel.send(embed);
  } else {
    let cmd = client.cmdhelp.filter(cmd => cmd.name === args[0]).first();
    if (!cmd) {
      embed.setTitle('That command could not be found.');
      message.channel.send(embed);
    } else {
      let cmdEmbed = new Discord.RichEmbed()
        .setTitle(cmd.displName)
        .setDescription(`${cmd.desc}\n\n**Usage:**\n\`\`\`${cmd.usage}\`\`\``)
        .setColor('#73C3AB')
      message.channel.send(cmdEmbed)
    }
  }
};

exports.help = {
  name: "help",
  category: "General",
  description: "Displays all the commands, or specify a command for details.",
  usage: "help [command]"
};