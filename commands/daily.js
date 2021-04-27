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
        let userDate = new Date(userTimestamp);
        let _second = 1000;
        let _minute = _second * 60;
        let _hour = _minute * 60;
        let _day = _hour * 24;
        let distance = userDate - date;
        let hours = Math.floor((distance % _day) / _hour);
        let minutes = Math.floor((distance % _hour) / _minute);
        let seconds = Math.floor((distance % _minute) / _second);
        
        if(date.valueOf() >= userTimestamp){
            let amount = Math.floor(Math.random() * 200 + 200);
            let dailyItem = item.getRandom();

            message.channel.send(lang.parseVariable(lang.getLang("dailyMoney"), {userid: message.author.id, amount: amount, item: dailyItem}));

            merged.user.addMoney(message.author.id, amount);
            merged.user.setDailyTime(message.author.id, dateTom.valueOf())
        }else{
            message.channel.send(lang.parseVariable(lang.getLang("dailyLimit"), {userid: message.author.id, date: `${hours} Jam ${minutes} Menit ${seconds} Detik`}))
        }
    }
}