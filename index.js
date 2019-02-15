const fs = require('fs');
const http = require('http');

const db = require('./Pokemons.json')
const imghash = require('imghash');
const request = require('request').defaults({ encoding: null });

const Discord = require('discord.js');
const client = new Discord.Client();

const prefixes = ['<@544450644015185940>', '<@!544450644015185940>'];

const express = require('express');
const app = express();

if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.commands = new Discord.Collection();
client.cmdhelp = new Discord.Collection();


client.loadCommands = () => {
  fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);

    let jsFiles = files.filter(f => f.split('.').pop() === 'js');

    console.log(`Loading a total of ${jsFiles.length} commands.`);

    jsFiles.forEach((f, i) => {
      delete require.cache[require.resolve(`./commands/${ f }`)];
      let props = require(`./commands/${ f }`);
      console.log("Loading command: " + f);
      client.commands.set(f, props);
      client.cmdhelp.set(props.help.name, props.help);
    });
  });
};

client.loadCommands();

client.on('ready', () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`Pokemons | CHamburr#2591`, {type: "WATCHING"});
});

client.on('error', (client, error) => {
  console.log("Unhandled error: " + error);
});

client.on('message', message => {
  try {
  	let embed = new Discord.RichEmbed()
  		.setColor(0xFF4500);
    
    if (message.guild && !message.channel.memberPermissions(client.user).has('SEND_MESSAGES')) return;
    
    if (message.guild && !message.channel.memberPermissions(client.user).has('EMBED_LINKS')) {
      return message.channel.send("I need the *Embed Links* permission. Please contact an administrator on this server.");
    }

    if (message.author.id == '365975655608745985') {
      message.embeds.forEach((e) => {
        if (e.description !== undefined && e.description.startsWith("Guess the pokémon and type")) {
          if (e.image) {
            let url = e.image.url;
            
            request(url, async function(err, res, body) {
              if (err !== null) return;
            
              imghash
                .hash(body)
                .then(hash => {
                  let result = db[hash];
                  
                  if (result === undefined) {
                    embed
                      .setTitle("Pokemon Not Found")
                      .setDescription("Please contact the owner CHamburr#2591 to add this Pokemon to the database.");
                    return message.channel.send(embed);
                  }
                
                  embed
                    .setTitle("Possible Pokemon: " + result)
                    .setFooter("Want this bot in your server? Do @" + client.user.tag + " invite.");
                  message.channel.send(embed);
                
                  console.log("[" + message.guild.name + "/#" + message.channel.name + "] " + result);
                })
            });
          }
        }
      });
    }

    if (message.author.bot) return;

    let prefix = false;
	  let args = message.content;
  	let command = "";
    
    if (message.content.startsWith("<@" + client.user.id + ">")) {
      prefix = "<@" + client.user.id + ">";
    }
    else if (message.content.startsWith("<@!" + client.user.id + ">")) {
      prefix = "<@!" + client.user.id + ">";
    } else {
      return;
    }
    
    args = message.content.slice(prefix.length).trim().split(/ +/g);
    command = args.shift().toLowerCase();

    let cmd = client.commands.get(command + ".js");
    
    if (cmd) {
      cmd.run(client, message, args);
    }
    
  	
  } catch (error3) {
    console.log("Error at message: " + error3);
  }
});

client.clean = async (text) => {
  if (text && text.constructor.name == "Promise")
    text = await text;
  
  if (typeof evaled !== "string")
    text = require("util").inspect(text, {depth: 1});

  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
    .replace(process.env.TOKEN, "--NO--TOKEN--");

  return text;
};

client.login(process.env.TOKEN);