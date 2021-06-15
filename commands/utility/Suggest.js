module.exports = {
  name: "suggest",
  description: "Sends A Suggestion In The Server Command Is Ran",
  usage: "<Suggestion>",
  run: async(client, message, args) => {
    
    let suggestionchn = await client.db.get(`${message.guild.id}.schn`)
    if (!suggestionchn) return client.embeds.error(message, "Suggestion Channel Not Set")
    
    if (args.length < 2) return client.embeds.error(message, "Be Specific While Siggesting")
    
    let channel = message.guild.channels.cache.get(suggestionchn)
    if (!channel) return client.embeds.error(message, "Couldn't Find Suggestion Channel")
    
    channel.send({ embed: {
      title: `Suggestion By ${message.author.tag}`,
      description: args.join(" "),
      color: client.color(message),
      thumbnail: {
        url: client.user.displayAvatarURL()
      },
      timestamp: new Date()
    }})
    
    return client.embeds.success(message, "Suggestion Sent")
  }
}