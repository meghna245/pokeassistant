const fs = require('fs');
const http = require('http');
const Discord = require('discord.js');
const client = new Discord.Client();
const unirest = require('unirest');
const html2json = require('html-to-json');

const prefix = '/';

const channels = ["460040860533391380"];

const pokemon = 'all';

const command = 'p!catch';

const express = require('express');
const app = express();

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


client.on('ready', () => {
    try {
        console.log("Process is running. (No runtime errors.)\nNode.js version: " + process.version + "/Discord.js version: " + Discord.version);
    } catch (error1) {
        console.log("[Runtime] " + error1);
    }
});

client.on('error', () => {
    try {
        console.log("[Error] " + error);
    } catch (error2) {
        console.log("Something went wrong!\n" + error2);
    }
});


function cleanResult(str) {
    var unwanted = [];
    var xstr = str.split(" ");
    for (var i = 0; i < unwanted.length; i++) {
        for (var j = 0; j < xstr.length; j++) {
            xstr[j].replace(/unwanted[i]/g, "");
        }
    }
    return xstr.join("");
}


const legends = ["mew", "entei", "groudon", "rayquaza", "manaphy", "arceus", "heatran", "marshadow", "regigigas", "raikou", "zygarde", "yveltal", "meloetta", "keldeo", "kyurem", "virizion", "terrakion", "uxie", "terrakion", "magearna", "zeraora", "ho-oh"];

const results = ["Best guess for this image: miu pokemon", "Best guess for this image: legendary dog pokemon entei", "Best guess for this image: pokemon ruby version - game boy advance", "Best guess for this image: pokemon emerald prima official game guide", "Best guess for this image: rare water type pokemon", "Best guess for this image: top 5 strongest pokemon", "Best guess for this image: pokemon trading card game", "Best guess for this image: pokemon tcg: shining legends marshadow pin collection", "Best guess for this image: legendary regi pokemon", "Best guess for this image: pokemon black and white legendaries", "Best guess for this image: zygarde 50", "Best guess for this image: pokémon y", "Best guess for this image: popular pokemon", "Best guess for this image: pokemon water and fighting type", "Best guess for this image: black and white legendary pokemon", "Best guess for this image: grass type legendary pokemon", "Best guess for this image: legendary pokemon swords of justice", "Best guess for this image: pokemon 480", "Best guess for this image: sword of justice pokemon terrakion", "Best guess for this image: magearna pokemon sun and moon cute", "Best guess for this image: sun and moon mythical pokemon", "Best guess for this image: pokémon shining legends super-premium collection featuring ho-oh"];

const legendz = ["articuno", "zapdos", "moltres", "mewtwo", "suicune", "lugia", "celebi", "regirock", "regice", "registeel", "kyogre", "groudon", "mesprit", "azelf", "dialga", "palkia", "giratina", "cresselia", "phione", "darkrai", "shaymin", "cobalion", "tornadus", "thundurus", "landorus", "diancie", "hoopa", "volcanion", "solgaleo", "lunala", "necrozma", "genesect", "jirachi", "deoxys", "latios", "latias", "Giratina", "tapu lele", "meltan", "melmetal"];

var secs = 86400000;
var spam = false;

function doSpam(id) {
    if (spam) {
        var interval = setInterval(function () {
            --secs;
            if (secs && spam) {
                client.channels.get(id).send(Math.floor(Math.random() * 864971562673452));
            } else {
                clearInterval();
            }
        }, 1200);
    }
}

client.on('message', message => {
    try {
        var args = message.content.split(" ");
        var content = message.content.toLowerCase();
        var channel = message.channel;
        var guild = message.guild;
        var author = message.author;
        
        if (message == prefix + "ping") {
          message.channel.send("Latency is " + (m.createdTimestamp - message.createdTimestamp) + "ms. API latency is " + Math.round(client.ping) + "ms.");
        }
      
        if (author.id == '365975655608745985') {

            //if (args[0] == prefix + 'spam' && author.id == client.user.id) {
            //    try {
            //        spam ? spam = false : spam = true;
            //        doSpam(channel.id);
            //    } catch (err) {
            //        channel.send("[Spammer] " + err);
            //    }
            //    message.delete();
            //}

            if (channels.includes(channel.id)) {
                message.embeds.forEach((embed) => {
                    if (embed.description == "Guess the pokémon and type " + command + " <pokémon> to catch it!") {
                        if (embed.image) {
                            var image1 = embed.image.url;
                            var clean_slash = image1.replace(/(\/)/gm, "%2F");
                            var clean = clean_slash.replace(/:+/gm, "%3A");
                            var cd = new Date;
                            var min = cd.getMinutes();
                            var hour = cd.getHours();
                            var initTime = cd.getMilliseconds();
                            console.log("https://www.google.com/searchbyimage?image_url=" + clean);
                            var request = unirest.get("https://www.google.com/searchbyimage?image_url=" + clean);
                            request.followRedirect(true);
                            request.maxRedirects(1);
                            request.timeout(2520);
                            request.headers({ "Accept": "application/json", "Content-type": "text/html", "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0", "Content-Language": "en", "Accept-Language": "en-gb" });
                            request.end(function (res) {
                                console.log(res.status);
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
                                                console.log(items1);
                                                if (typeof (items1[0]) != "undefined") {
                                                    console.log("[" + hour + ":" + min + "/" + guild + "/#" + channel.name + "]" + items1[0]);
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
                                                    var poke = f13.join("");
                                                    if (pokemon == "all") {
                                                        channel.send(command + " " + poke);
                                                        console.log("[" + hour + ":" + min + "/" + guild + "/#" + channel.name + "]" + "Caught: " + poke);
                                                    }
                                                    if (pokemon == "legend") {
                                                        if (!results.includes(items1[0]) && legendz.includes(poke)) {
                                                            channel.send(command + " " + poke);
                                                            console.log("[" + hour + ":" + min + "/" + guild + "/#" + channel.name + "]" + "Caught: " + poke);
                                                        }
                                                        if (!legendz.includes(poke) && results.includes(items1[0])) {
                                                            channel.send(command + " " + legends[results.indexOf(items1[0])]);
                                                            console.log("[" + hour + ":" + min + "/" + guild + "/#" + channel.name + "]" + "Caught: " + legends[results.indexOf(items1[0])]);
                                                        }
                                                    }
                                                    console.log(Math.floor(new Date().getMilliseconds() - initTime) + "ms.");
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
        }
    } catch (error3) {
        console.log("[Message] " + error3);
    }
});


client.login(process.env.TOKEN);