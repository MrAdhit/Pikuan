module.exports = {
    name: "dompet",
    alias: [
        "wallet"
    ],
    description: "Memeriksa jumlah uang!",
    run: async function(merged, message, args){
        if(!merged.user.isExist(message.author.id)) merged.user.createUser(message.author.id, message.author.username, 10);
        let mentUser = 0;
        if(args[0] != undefined) mentUser = merged.client.users.cache.get(args[0].replace("<@!", "").replace(">", ""));
        if(mentUser != 0) { 
            if(mentUser == undefined) return message.channel.send(`:no_entry_sign: <@!${message.author.id}> Saya tidak dapat menemukan user itu!`); 
            if(!merged.user.isExist(mentUser.id)) return message.channel.send(`:no_entry_sign: <@!${message.author.id}> Saya tidak dapat menemukan user itu!`); 
        }
        
        message.reply(`${(mentUser == 0) ? "Kamu" : mentUser.username} mempunyai uang ${merged.user.getMoney(((mentUser == 0) ? message.author.id : mentUser.id))} pik`);
    }
}