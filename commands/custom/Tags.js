module.exports = {
  name: "tag",
  description: "Create Custom Responded Commands For Your Server",
  usage: "create <Command Name> <Command Response> | delete <Command Name> | list",
  authorPermission: ["ADMINISTRATOR"],
  run: async(client, message, args) => {
    
    if (!args[0]) return client.embeds.nomal(message, "Tags", "tag create <Command Name> <Command Response>\ntag delete <Command Name>\n<tag list>")
    
    if (args[0].toLowerCase() === 'create') {
      if (!args[1]) return client.embeds.error(message, "What Should The Tag Name Be?")
      if (!args.slice(2).join(" ")) return client.embeds.error(message, "What Should The Tag Response Be")
      
      let data = await client.db.get(`${message.guild.id}.tags`)
      if (data && data.find(x => x.name === args[1].toLowerCase())) return client.embeds.error(message, "There Is Already A Tag With Name")
      
      let data2 = {
      name: args[1].toLowerCase(),
      response: args.slice(2).join(" ")
      }
      
      await client.db.push(`${message.guild.id}.tags`, data2)
      return client.embeds.success(message, "Successfully Added That Tag")
    }
    
    if (args[0].toLowerCase() === 'delete') {
      if (!args[1]) return client.embeds.error(message, "Which Tag Are You Deleting")
      
      let data = await client.db.get(`${message.guild.id}.tags`)
      if (data && !data.find(x => x.name === args[1].toLowerCase())) return client.embeds.error(message, "There Is No Such Tag Created")
      
      let index = data.filter(x => x.name !== args[1].toLowerCase())
      
      await client.db.set(`${message.guild.id}.tags`, index)
      return client.embeds.success(message, "Removed The Tag")
      
    }
    
    if (args[0].toLowerCase() === 'list') {
      let data = await client.db.get(`${message.guild.id}.tags`);
      
      let array;
      
      if (data && data.length) {
        array = [];
        data.forEach(x => {
          array.push(x.name)
        })
      }
      return client.embeds.normal(message, "Tags", `${array ? array : "No Tags Created Yet"}`)
    }
  }
}