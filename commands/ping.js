module.exports = {
    name: "ping",
    description: "Ping Description",
    run: async function(client, message, args){
        message.reply("Pong");
    }
}