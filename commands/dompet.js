module.exports = {
    name: "dompet",
    alias: [
        "wallet"
    ],
    description: "Memeriksa jumlah uang!",
    run: async function(merged, message, args){
        if(!merged.user.isExist(message.author.id)) merged.user.createUser(message.author.id, message.author.username, 10);
        message.reply(`Kamu mempunyai uang ${merged.user.getMoney(message.author.id)} pik`);
    }
}