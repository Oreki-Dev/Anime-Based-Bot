const { MessageEmbed } = require("discord.js");

module.exports = {
name: "kiss",
description: "Kiss Someone",
usage: "<@User>",
run: async(client, message, args) => {

        let member = client.resolveMember(message, args, false)
        if (!member) return client.embeds.error(message, "Who Are You Even Trying To Kiss")
        
        if (member.user.id === message.author.id) return client.embeds.error(message, "You Want To Kiss Yourself?")
        
        if (member.user.id === client.user.id && !client.config.owners.includes(message.author.id)) return client.embeds.error(message, "Only My Owner Can Kiss Me")
        
        let url = await client.images.get("kiss")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Kissed ${member.user.tag}`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}