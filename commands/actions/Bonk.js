const { MessageEmbed } = require("discord.js");

module.exports = {
name: "bonk",
description: "Bonk Someone",
usage: "<@User>",
run: async(client, message, args) => {
  
        let member = client.resolveMember(message, args, false)
        if (!member) return client.embeds.error(message, "Who Are You Even Trying To Bonk")
        
        if (member.user.id === message.author.id) return client.embeds.error(message, "You Want To Bonk Yourself?")
        
        if (member.user.id === client.user.id && !client.config.owners.includes(message.author.id)) return client.embeds.error(message, "Only My Owner Can Bonk Me")
        
        let url = await client.images.get("bonk")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Bonks ${member.user.tag}`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}