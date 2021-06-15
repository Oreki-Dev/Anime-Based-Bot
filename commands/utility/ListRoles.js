module.exports = {
  name: "listroles",
  description: "Shows All The Roles Of The Guild",
  run: async(client, message, args) => {
    
    let desc = []
    message.guild.roles.cache.filter(role => role.name !== '@everyone').forEach(c => {
      desc.push(`${c.name} | ${c.members.size} members`)
    })
    
    client.embeds.normal(message, "All Roles", desc.join("\n"))
  }
}