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

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.commands = new Discord.Collection();
client.cmdhelp = new Discord.Collection();

async function loadCommands() {
  const cmdFiles = fs.readdir('./commands/');
  console.log(`Loading a total of ${cmdFiles.length} commands.`);

  cmdFiles.forEach(f => {
    if (!f.endsWith('.js')) return;
      
    delete require.cache[require.resolve(`./commands/${ f }`)];
    let props = require(`./commands/${ f }`);
    
    try {
      client.commands.set(f, props);
      client.cmdhelp.set(props.help.name, props.help);
    } catch (err) {
      console.log("Error loading command " + f + ": " + err);
    }
  });
};

loadCommands();

client.on('ready', () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`Pokemons | CHamburr#2591`, {type: "WATCHING"});
});

client.on('error', (client, error) => {
  console.log("Unhandled error: " + error);
});

client.on('message', message => {
  try {
	  var args = message.content;
  	var command = "";
  	var embed = new Discord.RichEmbed()
  		.setColor(0xFF4500);

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
                      .setDescription("Please contact the owner, CHamburr#2591")
                  }
                  client.channels.get('545543547181334548').send('```"' + hash + '":"' + name + '",```');	
                })
            });
          }
        }
      });
    }

    if (message.author.bot) return;

    var prefix = false;

    for (const thisPrefix of prefixes) {
      if (message.content.startsWith(thisPrefix)) {
      	prefix = thisPrefix;
      	args = message.content.slice(thisPrefix.length).trim().split(/ +/g);
      	command = args.shift().toLowerCase();
    	}
  	} 
  
  	if (!prefix) return;

  	if (command == "ping") {
  		embed
  			.setTitle("Ping?");

  		message.channel.send(embed).then(m => {
  			embed
    			.setTitle("Pong!")
    			.setDescription("Latency is " + (m.createdTimestamp - message.createdTimestamp) + "ms. API latency is " + Math.round(client.ping) + "ms.");

        m.edit(embed);
      });
  	}
  	else if (command == "eval") {
  		if (message.author.id != process.env.OWNER) {
  			return;
  		}
      
      var code = args.join(" ");
      
      async function evaluate(code) {
  	  	try {
 		      const evaled = eval(code);
    		  const clean = await client.clean(evaled);

    		  embed
      		  .setTitle("Output")
  		      .setDescription("```js\n" + clean.substr(0, 2000) + "```")
      		  .addField("Code", "```js\n" + code.substr(0, 1000) + "```");
    		  message.channel.send(embed);
  		  } catch (err) {
    		  embed
      		  .setTitle("Error")
      		  .setDescription("```xl\n" + (await client.clean(err)).substr(0, 2000) + "```")
    		  message.channel.send(embed);
  		  }
      }
      
      evaluate(code)
  	}
  } catch (error3) {
    console.log("[Message] " + error3);
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