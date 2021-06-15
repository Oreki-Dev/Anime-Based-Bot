module.exports = {
  name: "chatbot",
  aliases: ["cb"],
  authorPermission: ["ADMINISTRATOR"],
  run: async(client, message, args) => {
    
    let chan = await client.db.get(`${message.guild.id}.chatbot`)
    if (!chan) chan === null;
    
    if (!args[0]) {
      return client.embeds.normal(message, "Chatbot Config", `Chatbot : ${chan ? 'Enabled' : 'Disabled'}\nChannel : ${chan ? message.guild.channels.cache.get(chan).name : 'Not Set'}\n\nTo Enabled Use Command\nchatbot set <#Channel/Id>\nTo Reset Chatbot Use\nchatbot reset`)
    }
    
    if (args[0].toLowerCase() === 'set') {
    let channel = client.resolveChannel(message, args) 
    if (!channel) return client.embeds.error(message, "You Need To Mention A Channel Or Provide ID, Baka!")
    if (channel.id === chan) return client.embeds.error(message, "That Channel Is Already Set As Chatbot Channel")
    
    await client.db.set(`${message.guild.id}.chatbot`, channel.id)
    return client.embeds.success(message, `Chatbot Channel Set As ${channel.name}`)
    }
    
    if (args[0].toLowerCase() === 'reset') {
      if (!chan) return client.embeds.error(message, "Chatbot Channel Is Not Set")
      await client.db.delete(`${message.guild.id}.chatbot`)
      return client.embeds.success(message, "Chatbot Channel Reset")
    }
  }
}