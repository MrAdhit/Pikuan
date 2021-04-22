const fs = require("fs");
const Discord = require("discord.js");

class Manager{
    /**
     * 
     * @param {Discord.Client} client Client
     */
    constructor(client){
        this.client = client;
    }
}

module.exports = Manager;