const Lang = require("../Manager/LangManager");
const Item = require("../Manager/ItemManager");

const lang = new Lang();
const item = new Item();

module.exports = {
    name: "daily",
    alias: [
        "dl"
    ],
    description: "Mendapatkan hadiah harian",
    run: async function(merged, message, args){
        if(!merged.user.isExist(message.author.id)) merged.user.createUser(message.author.id, message.author.username, 10);
        
        let dateArray = new Date().toJSON().split("T"); dateArray[0] = dateArray[0].split("-"); dateArray[1] = dateArray[1].split(":");
        let dateTom = new Date(dateArray[0][0], dateArray[0][1], parseInt(dateArray[0][2])+1, dateArray[1][0], dateArray[1][1], Math.round(parseInt(dateArray[1][2])));
        let date = new Date();
        let userTimestamp = merged.user.getDailyTime(message.author.id);
        
        if(date.valueOf() >= userTimestamp){
            let amount = Math.floor(Math.random() * 200 + 200);
            let dailyItem = item.getRandom();

            message.channel.send(lang.parseVariable(lang.getLang("dailyMoney"), {userid: message.author.id, amount: amount, item: dailyItem}));

            merged.user.addMoney(message.author.id, amount);
        }else{
            let currDate = new Date(userTimestamp);

            message.channel.send(lang.parseVariable(lang.getLang("dailyLimit"), {userid: message.author.id, date: currDate.toUTCString()}))
        }
    }
}