module.exports = {
    name: "ping",
    description: "Ping Description",
    run: async function(client, message){
        message.reply("Pong");
    }
}