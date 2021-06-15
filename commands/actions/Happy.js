const { MessageEmbed } = require("discord.js");

module.exports = {
name: "happy",
description: "You're Happy",
run: async(client, message, args) => {
     
        let url = await client.images.get("happy")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Is Happy!`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}