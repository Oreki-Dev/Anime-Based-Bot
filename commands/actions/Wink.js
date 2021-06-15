const { MessageEmbed } = require("discord.js");

module.exports = {
name: "wink",
description: "Wink At Someone",
usage: "<@User>",
run: async(client, message, args) => {

        let member = client.resolveMember(message, args, false)
        if (!member) return client.embeds.error(message, "Who Are You Even Trying To Wink At")
        
        if (member.user.id === message.author.id) return client.embeds.error(message, "You Want To Wink At Yourself?")
        
        if (member.user.id === client.user.id && !client.config.owners.includes(message.author.id)) return client.embeds.error(message, "Only My Owner Can Wink At Me")
        
        let url = await client.images.get("wink")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Winks At ${member.user.tag}`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}