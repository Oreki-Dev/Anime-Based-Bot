module.exports = {
  name: "whitelist",
  ownerOnly: true,
  run: async(client, message, args) => {
    
    if (!args[0]) return client.embeds.error(message, "Dev, Whitelisting A Server Or User?")
    
    if (args[0].toLowerCase() === 'server') {
      if (!args[1]) return client.embeds.error(message, "Dev, Server ID?")
      let array = await client.db.get("Owner.blacklistedServers");
      if (!array.includes(args[1])) return client.embeds.error(message, "Dev, That Server Is Not Blacklisted")
      
      const index = array.filter(item => item !== args[1]);
      if (index) {
        await client.db.set("Owner.blacklistedServers", index);
        return client.embeds.success(message, "Dev, Successfully Removed That Server From Being Blacklisted")
      } else {
        return client.embeds.error(message, "Dev Something Went Wrong")
      }
    }
    
    if (args[0].toLowerCase() === 'user') {
      if (!args[1]) return client.embeds.error(message, "Dev, User ID?")
      
      let array = await client.db.get("Owner.blacklistedUsers");
      if (!array.includes(args[1])) return client.embeds.error(message, "Dev, That User Is Not Blacklisted")
      
      const index = array.filter(item => item !== args[1]);
      if (index) {
       await client.db.set("Owner.blacklistedUsers", index);
       return client.embeds.success(message, "Dev, Successfully Removed That User From Being Blacklisted")
      } else {
        return client.embeds.error(message, "Dev, Something Went Wrong")
      }
    }
  }
}