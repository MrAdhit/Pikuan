const Lang = require("../Manager/LangManager");
const Item = require("../Manager/ItemManager");

const lang = new Lang();
const item = new Item();

module.exports = {
    name: "inventory",
    aliases: [
        "inv"
    ],
    description: "Get inventory information",
    run: async function(merged, message, args){
        if(!merged.user.isExist(message.author.id)) merged.user.createUser(message.author.id, message.author.username, 10);
        
        let userItems = merged.user.getInventory(message.author.id); let arr = [];
        let newLineList = [ 4, 8, 12, 16, 20 ];
        userItems = userItems.map((v, index) => ((newLineList.includes(index)) ? `\`\`${v.id}\`\`${item.getActualItem(v.id)}${lang.smallNum(v.amount)}\n` : `\`\`${v.id}\`\`${item.getActualItem(v.id)}${lang.smallNum(v.amount)}`));
        
        message.channel.send(`
            **==== ${message.author.username}'s inventories ====**
${userItems.join(" ")}
        `);
    }
}