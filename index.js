let debug = typeof v8debug === 'object' || /--debug|--inspect/.test(process.argv.join(' '));
(debug ? require('dotenv').config() : "");

const { Client } = require("discord.js");

const client = new Client();

const defaultPrefix = process.env.PREFIX;

client.on("ready", ()=>{
    log(`${client.user.username} siap di ${client.guilds.fetch.length} guilds`);
});

client.on("message", async(message)=>{
    let args = message.content.split(" ").slice(2);
    let command = message.content.split(" ")[1];
    let prefix = message.content.split(" ")[0];

    if(prefix != defaultPrefix) return;

    try {
        await require(`./commands/${command}`).run(client, message, args);
    } catch (e) {
        message.reply("cmd not found");
    }
})

let log = function(message){
    console.log(message)
}

client.login(process.env.TOKEN);