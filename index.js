const { Client, Intents } = require("discord.js");
const discord = require("discord.js");
const { token } = require("./config.json");
const bot = new Client({intents:  [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");
const config = require('./config.json')


    fs.readdir("./eventos/", (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) return;
        jsfiles.forEach((f, i) => {
            require(`./eventos/${f}`);
        });
    });

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
bot.afk = new Map();

module.exports.bot = bot;


bot.login(config.token)