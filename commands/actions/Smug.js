const { MessageEmbed } = require("discord.js");

module.exports = {
name: "smug",
description: "You're Smugging",
run: async(client, message, args) => {
     
        let url = await client.images.get("smug")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Smugs!`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}