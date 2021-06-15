const { MessageEmbed } = require("discord.js");

module.exports = {
name: "dance",
description: "You're Dancing",
run: async(client, message, args) => {
     
        let url = await client.images.get("dance")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Is Dancing!`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}