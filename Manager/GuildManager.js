const Manager = require("./Manager");
const fs = require("fs");

class GuilldManager extends Manager{
    constructor(){
        super();
    }

    /**
     * Get Guild database Path
     * @param {string} guildid GuildID
     * @returns string
     */
    getPath(guildid){
        return `./database/guilds/${guildid}.json`;
    }

    /**
     * Create new guild config or overwrite existing
     * @param {string} guildid Guild ID
     * @param {string} guildname Guild Name
     */
    createConfig(guildid, guildname){
        fs.writeFileSync(this.getPath(guildid), JSON.stringify({
            name: guildname,
            prefix: "pik"
        }, null, 2));
    }

    deleteConfig(guildid){
        fs.rmSync(this.getPath(guildid));
    }

    /**
     * Get Prefix from Guild
     * @param {string} guildid Guild ID
     * @returns string
     */
    getPrefix(guildid){
        if(!this.isExist(guildid)) return {error: true, code: 0};
        return this.getJSON(guildid).prefix;
    }

    /**
     * Set Guild Prefix
     * @param {string} guildid Guild ID
     * @param {string} prefix Guild ID
     * @returns object
     */
    setPrefix(guildid, prefix){
        if(!this.isExist(guildid)) return {error: true, code: 0};
        let data = this.getJSON(guildid);
        data.prefix = prefix;
        fs.writeFileSync(this.getPath(guildid), JSON.stringify(data, null, 2));
        return data;
    }

    /**
     * Check if Guild database exist
     * @param {string} guildid Guild ID
     * @returns boolean
     */
    isExist(guildid){
        return fs.existsSync(this.getPath(guildid));
    }

    /**
     * Get JSON Object of Guild Database
     * @param {string} guildid Guild ID
     * @returns object
     */
    getJSON(guildid){
        if(!fs.existsSync(`./database/guilds/${guildid}.json`)) return {error: true, code: 0}
        return JSON.parse(fs.readFileSync(`./database/guilds/${guildid}.json`).toString());
    }
}

module.exports = GuilldManager;