module.exports = {
  name: "blacklist",
  ownerOnly: true,
  run: async(client, message, args) => {
    
    if(!args[0]) return client.embeds.error(message, "Dev, blacklisting A Server Or User?")
    
    if (args[0].toLowerCase() === 'server') {
      if (!args[1]) return client.embeds.errror(message, "Dev, Server ID?")
      await client.db.push("Owner.blacklistedServers", args[1])
      return client.embeds.success(message, "Blacklisted Server")
    }
    
    if (args[0].toLowerCase() === 'user') {
      if (!args[1]) return client.embeds.error(message, "Dev, User ID?")
      await client.db.push("Owner.blacklistedUsers", args[1])
      return client.embeds.success(message, "Blacklisted User")
    }
  }
}