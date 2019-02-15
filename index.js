const fs = require('fs');
const http = require('http');
const Discord = require('discord.js');
const client = new Discord.Client();
const unirest = require('unirest');
const html2json = require('html-to-json');

const prefixes = ['<@544450644015185940>', '<@!544450644015185940>'];
const owner = "446290930723717120";

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

function loadCommands() {
  fs.readdir('./commands/', (err, files) => {
    if (err) console.error("Error loading commands: " + err);

        let jsFiles = files.filter(f => f.split('.').pop() === 'js');
        if (jsFiles.length <= 0) {
            console.log('No commands to load.');
            return;
        };

        console.log(`Loading ${jsFiles.length} commands!`);

        jsFiles.forEach((f, i) => {

            delete require.cache[require.resolve(`./commands/${ f }`)];
            let props = require(`./commands/${ f }`);
            console.log(`${i + 1}: ${f} loaded!`);
            client.commands.set(f, props);
            client.cmdhelp.set(props.help.name, props.help);

        });
    });

};

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
            var image1 = e.image.url;
            var clean_slash = image1.replace(/(\/)/gm, "%2F");
            var clean = clean_slash.replace(/:+/gm, "%3A");
            var cd = new Date;
            var min = cd.getMinutes();
            var hour = cd.getHours();
            var initTime = cd.getMilliseconds();

            var request = unirest.get("https://www.google.com/searchbyimage?image_url=" + clean);

            request.followRedirect(true);
            request.maxRedirects(1);
            request.timeout(2520);
            request.headers({ "Accept": "application/json", "Content-type": "text/html", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0", "Content-Language": "en", "Accept-Language": "en-gb" });
            request.end(function (res) {
              if (typeof (res.request) != "undefined" && res.status == 200) {
                var request2 = unirest.get(res.request.headers.referer);

                request2.followRedirect(true);
                request2.followAllRedirects(true);
                request2.maxRedirects(1);
                request2.timeout(1900);
                request2.headers({ "Accept": "application/json", "Content-type": "text/html", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0", "Content-Language": "en", "Accept-Language": "en-gb" });
                request2.end(function (res2) {
                  if (res2.body) {
                    html2json.parse(res2.body, ['.r5a77d', function ($item) {
                      return $item.text();
                    }]).done(function (items1) {
                      if (typeof (items1[0]) != "undefined") {
                        var result = items1[0].split(" ");
                        var f1 = items1[0].replace(/Best guess for this image:/g, "");
                        var f2 = f1.replace(/Results/g, "");
                        var f3 = f2.replace(/pokemon/g, "");
                        var f4 = f3.replace(/go/g, "");
                        var f5 = f4.replace(/png/g, "");
                        var f6 = f5.replace(/evolution/g, "");
                        var f7 = f6.replace(/for/g, "");
                        var f8 = f7.replace(/nobackground/g, "");
                        var f9 = f8.replace(/pokémon/g, "");
                        var f10 = f9.replace(/blackandwhite/g, "");
                        var f11 = f10.replace(/shiny/g, "");
                        var f12 = f11.toLowerCase();

                        if (typeof (f12) != "undefined") var f13 = f12.split(" ");

                        var poke = f13.join(" ");
                        
                        poke = poke.replace(/possible related search:\s+/g, "");
                        poke = poke.charAt(0).toUpperCase() + poke.slice(1);
                        
                        embed
                          .setTitle("Possible Pokemon")
                          .setDescription(poke);

                        message.channel.send(embed);
                        
                        var latency = Math.floor(new Date().getMilliseconds() - initTime) + "ms";

                        console.log("[" + hour + ":" + min + "/" + message.guild + "/#" + message.channel.name + "] " + poke + " (" + latency + ")");
                      }
                    }, function (err) {
                      console.log(err);
                    });
                  }
                });
              } else {
                process.end;
              }
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
  		if (message.author.id != owner) {
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