module.exports = {
  name: "suggestionchn",
  description: "Set Up Suggetion Channel Or Delete",
  usage: "set <#Channel/Id> | delete",
  authorPermission: ["ADMINISTRATOR"],
  run: async(client, message, args) => {
    
    let Schn = await client.db.get(`${message.guild.id}.schn`)
    if (!Schn) Schn = null;
    
    if (!args[0]) return client.embeds.normal(message, "Suggestion Channel", `Suggestion Channel : ${Schn ? message.guild.channels.cache.get(Schn) :  'Not Set'}\nTo Set Use Command\nsuggestionchn set <#Channel/Id>\nTo Reset Use Command\nsuggestionchn reset`)
    
    if (args[0].toLowerCase() === 'set') {
    let channel = client.resolveChannel(message, args)
    if (!channel) return client.embeds.error(message, "You Need To Mention A Channel Or Provide An Id")
    
    await client.db.set(`${message.guild.id}.schn`, channel.id)
    return client.embeds.success(message, "Suggestion Channel Set")
    }
    
    if (args[0].toLowerCase() === 'reset') {
      await client.db.delete(`${message.guild.id}.schn`)
      return client.embeds.success(message, "Suggestion Channel Reset")
    }
    
  }
}