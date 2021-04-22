module.exports = {
    name: "give",
    description: "Memeriksa jumlah uang!",
    run: async function(merged, message, args){
        if(!merged.user.isExist(message.author.id)) merged.user.createUser(message.author.id, message.author.username, 10);
        if(args[0] == undefined) return message.channel.send(`:no_entry_sign: <@!${message.author.id}> Saya tidak dapat menemukan user itu!`);
        let user = merged.client.users.cache.get(args[0].replace("<@!", "").replace(">", ""));
        if(user.bot) return message.channel.send(`:no_entry_sign: <@!${message.author.id}> Kamu tidak dapet mengirimkan pik ke bot!`);
        if(args[1] == undefined) return message.channel.send(`:no_entry_sign: <@!${message.author.id}> Masukkan jumlah uang yang mau dikirim!`);
        if(!merged.user.isExist(user.id)) return message.channel.send(`:no_entry_sign: <@!${message.author.id}> Saya tidak dapat menemukan user itu!`);
        if(args[1] < 50) return message.channel.send(`:no_entry_sign: <@!${message.author.id}> Kamu harus mengirim minimal 50 pik`);

        merged.user.removeMoney(message.author.id, args[1]);
        merged.user.addMoney(user.id, args[1]);

        message.channel.send(`:credit_card: <@!${message.author.id}> mengirim ${args[1]} pik ke ${user.username}#${user.discriminator}`)
    }
}