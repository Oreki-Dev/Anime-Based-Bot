const { MessageEmbed } = require("discord.js");

module.exports = {
name: "lick",
description: "Lick Someone",
usage: "<@User>",
run: async(client, message, args) => {

        let member = client.resolveMember(message, args, false)
        if (!member) return client.embeds.error(message, "Who Are You Even Trying To Lick")
        
        if (member.user.id === message.author.id) return client.embeds.error(message, "You Want To Lick Yourself?")
        
        if (member.user.id === client.user.id && !client.config.owners.includes(message.author.id)) return client.embeds.error(message, "Only My Owner Can Lick Me")
        
        let url = await client.images.get("lick")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Is Licking ${member.user.tag}`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}