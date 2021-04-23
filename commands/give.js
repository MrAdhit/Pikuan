const Lang = require("../Manager/LangManager");

const lang = new Lang();

module.exports = {
    name: "give",
    description: "Memeriksa jumlah uang!",
    run: async function(merged, message, args){
        if(!merged.user.isExist(message.author.id)) merged.user.createUser(message.author.id, message.author.username, 10);
        if(args[0] == undefined) return message.channel.send(lang.parseVariable(lang.getLang("userNotFound"), {userid: message.author.id}));
        merged.client.users.fetch(args[0].replace("<@!", "").replace(">", "").replace("<@", ""));
        let user = merged.client.users.cache.get(args[0].replace("<@!", "").replace(">", "").replace("<@", ""));
        if(user.bot) return message.channel.send(lang.parseVariable(lang.getLang("cantGiveToBot"), {userid: message.author.id}));
        if(args[1] == undefined) return message.channel.send(lang.parseVariable(lang.getLang("undefinedGiveAmount"), {userid: message.author.id}));
        if(!merged.user.isExist(user.id)) return message.channel.send(lang.parseVariable(lang.getLang("userNotFound"), {userid: message.author.id}));
        if(args[1] < 50) return message.channel.send(lang.parseVariable(lang.getLang("minimumGiveAmount"), {userid: message.author.id}));
        if(args[1] > merged.user.getMoney(message.author.id)) return message.channel.send(lang.parseVariable(lang.getLang("notEnoughMoney"), {userid: message.author.id}))
        
        merged.user.removeMoney(message.author.id, args[1]);
        merged.user.addMoney(user.id, args[1]);

        message.channel.send(lang.parseVariable(lang.getLang("sendMoneySuccess"), {
            userid: message.author.id,
            amount: args[1],
            username: `${user.username}#${user.discriminator}`
        }))
    }
}