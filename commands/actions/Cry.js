const { MessageEmbed } = require("discord.js");

module.exports = {
name: "cry",
description: "You're Crying",
run: async(client, message, args) => {
     
        let url = await client.images.get("cry")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Is Crying!`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}