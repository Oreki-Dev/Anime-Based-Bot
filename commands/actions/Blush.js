const { MessageEmbed } = require("discord.js");

module.exports = {
name: "blush",
description: "You're Blushing",
run: async(client, message, args) => {
     
        let url = await client.images.get("blush")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Is Blushing!`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}