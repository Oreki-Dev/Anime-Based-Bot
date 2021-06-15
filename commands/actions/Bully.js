const { MessageEmbed } = require("discord.js");

module.exports = {
name: "bully",
description: "Bully Someone",
usage: "<@User>",
run: async(client, message, args) => {

        let member = client.resolveMember(message, args, false)
        if (!member) return client.embeds.error(message, "Who Are You Even Trying To Bully")
        
        if (member.user.id === message.author.id) return client.embeds.error(message, "You Want To Bully Yourself?")
        
        if (member.user.id === client.user.id && !client.config.owners.includes(message.author.id)) return client.embeds.error(message, "Only My Owner Can Bully Me")
        
        let url = await client.images.get("bully")
        
        let embed = new MessageEmbed()
        .setTitle(`${message.author.tag} Is Bullying ${member.user.tag}`)
        .setColor(client.color(message))
        .setImage(url)
        .setTimestamp()
        
        message.channel.send(embed)
}
}