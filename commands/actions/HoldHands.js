const { MessageEmbed } = require("discord.js");

module.exports = {
name: "holdhands",
description: "Hold Hands With Someone",
usage: "<@User>",
run: async(client, message, args) => {
        
        let member = client.resolveMember(message, args, false)
        if (!member) return client.embeds.error(message, "Who Are You Even Trying To Jold Hands With?")
        
        if (member.user.id === message.author.id) return client.embeds.error(message, "You Want To Hold Hands Of Yourself?")
        
        if (member.user.id === client.user.id && !client.config.owners.includes(message.author.id)) return client.embeds.error(message, "Only My Owner Can Hold Hands With Me")
        
        let url = await client.images.get("handhold")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Holds Hands Of ${member.user.tag}`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}