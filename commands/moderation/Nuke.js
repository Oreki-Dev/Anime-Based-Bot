module.exports = {
name: "nuke",
description: "Nukes A Channel",
usage: "<#Channel (Optional)>",
authorPermission: ["ADMINISTRATOR"],
botPermission: ["ADMINISTRATOR"],
run: async(client, message, args) => {
        let channel = message.mentions.channels.first() || message.channel;
        
        let position = channel.position;
        let topic = channel.topic;
        
        channel.clone().then(async(channel2) => {
        channel2.setPosition(position)
        channel2.setTopic(topic)
        
        await channel.delete()
        
        await channel2.send({ embed: {
            title: "Channel Nuked",
            description: `\`\`\`Nuked By ${message.author.username}\`\`\``,
            color: client.color(message),
            thumbnail: {
                url: client.user.displayAvatarURL()
                },
            timestamp: new Date()
            }})
            
            })
}
}