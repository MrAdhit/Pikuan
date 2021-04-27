let debug = typeof v8debug === 'object' || /--debug|--inspect/.test(process.argv.join(' '));
(debug ? require('dotenv').config() : "");

const { Client } = require("discord.js");
const Manager = require("./Manager/Manager");
const User = require("./Manager/UserManager");
const Guild = require("./Manager/GuildManager");

const client = new Client();
const manager = new Manager(client);

const user = new User();
const guildm = new Guild();

const merged = {client, user};

client.on("ready", ()=>{
    // log(user.getItemAmount("405479178738204673", "0"))
    log(`${client.user.username} siap di ${client.guilds.fetch.length} guilds`);
});

client.on("message", async(message)=>{
    let args = message.content.split(" ").slice(2);
    let command = message.content.split(" ")[1];
    let prefix = message.content.split(" ")[0];
    let guildPrefix = guildm.getPrefix(message.guild.id);

    if(prefix != guildPrefix) return;
    
    try {
        let cmd = await require(`./commands/${command}`);
        if(cmd.aliasOf != undefined){
            await require(`./commands/${cmd.aliasOf}`).run(merged, message, args);
        }else{
            await cmd.run(merged, message, args);
        }
    } catch (e) {
        console.log(e)
        message.reply("cmd not found");
    }
});

client.on("guildCreate", (guild)=>{
    guildm.createConfig(guild.id, guild.name);
});

client.on("guildDelete", (guild)=>{
    guildm.deleteConfig(guild.id);
})

let log = function(message){
    console.log(message)
}

client.login(process.env.TOKEN);