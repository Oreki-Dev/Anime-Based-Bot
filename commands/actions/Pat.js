const { MessageEmbed } = require("discord.js");

module.exports = {
name: "pat",
description: "Pat Someone",
usage: "<@User>",
run: async(client, message, args) => {

        let member = client.resolveMember(message, args, false)
        if (!member) return client.embeds.error(message, "Who Are You Even Trying To Pat")
        
        if (member.user.id === message.author.id) return client.embeds.error(message, "You Want To Pat Yourself?")
        
        if (member.user.id === client.user.id && !client.config.owners.includes(message.author.id)) return client.embeds.error(message, "Only My Owner Can Pat Me")
        
        let url = await client.images.get("pat")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Pats ${member.user.tag}`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}