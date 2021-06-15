const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "suggestion",
  description: "Accept Or Reject A Suggestion",
  usage: "accept/reject <Message ID>",
  authorPermission: ["MANAGE_GUILD"],  run: async(client, message, args) => {
  
    let suggestionchn = await client.db.get(`${message.guild.id}.schn`)
    if (!suggestionchn) return client.embeds.error(message, "Suggestion Channel Not Set")
    
    let channel = message.guild.channels.cache.get(suggestionchn)
    if (!channel) return client.embeds.error(message, "Suggestion Channel Not Found")
    
    let response = args[0]
    let messageId = args[1]
    
    if (!response) return client.embeds.error(message, "Baka! Accepting Or Rejecting?")
    
    if (!messageId) return client.embeds.error(message, "Baka! Message Id Is Required")
    
    const targetMessage = await channel.messages.fetch(messageId, false, true)
    if (!targetMessage) return client.embeds.error(message, "Message Doesn't Exist?")
    
    const oldEmbed = targetMessage.embeds[0]
    
    if (oldEmbed.fields[0]) return client.embeds.error(message, "Already Replied To That Suggestion")

    const embed = new MessageEmbed()
      .setAuthor(oldEmbed.title)
      .setDescription(oldEmbed.description)
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL())
      
    if (response.toLowerCase() === 'accept') {
      embed.setColor('GREEN')
      embed.addField("Response", "Accepted")
    } else if (response.toLowerCase() === 'reject') {
      embed.setColor('RED')
      embed.addField("Response", "Rejected")
    } else {
      return client.embeds.error(message, "Invalid Option")
    }
    
    targetMessage.edit(embed)
    return client.embeds.success(message, "Replied To Suggestion")
  }
}