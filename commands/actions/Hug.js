const { MessageEmbed } = require("discord.js");

module.exports = {
name: "hug",
description: "Hug a Friend",
usage: "<@Member>",
run: async(client, message, args) => {

        let member = client.resolveMember(message, args, false)
        if (!member) return client.embeds.error(message.channel, "Who Are You Even Trying To Hug")
        
        if (member.user.id === message.author.id) return client.embeds.error(message.channel, "You Want To Hug Yourself?")
        
        if (member.user.id === client.user.id && !client.config.owners.includes(message.author.id)) return client.embeds.error(message.channel, "Only My Owner Can Hug Me")
        
        let url = await client.images.get("hug")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Hugged ${member.user.tag}`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}