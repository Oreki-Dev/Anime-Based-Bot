module.exports = {
  name: "command",
  aliases: ["cmd"],
  description: "Enable Or Disable A Comamnd In The Server",
  usage: "enable <Command> | disable <command>",
  authorPermission: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    
    if (!args[0]) return client.embeds.error(message, "Disabling Or Enabling Command?")
    
    if (args[0].toLowerCase() === 'enable') {
      if (!args[1]) return client.embeds.error(message, "Which Command Are You Trying To Enabled")
      
      if (!client.commands.get(args[1].toLowerCase())) return client.embeds.error(message, "That Is Not A Valid Command")
      
      let array = await client.db.get(`${message.guild.id}.disabledCommands`)
      
      if (array && !array.includes(args[1])) return client.embeds.error(message, "That Command Is Already Enabled")
      
      let index = array.filter(item => item !== args[1].toLowerCase())
      
      await client.db.set(`${message.guild.id}.disabledCommands`, index)
      
      return client.embeds.success(message, "Successfully Emabled That Command")
    }
    
    if (args[0].toLowerCase() === 'disable') {
      if (!args[1]) return client.embeds.error(message, "Which Command Are You Trying To Disable")
      
      if (!client.commands.get(args[1])) return client.embeds.error(message, "That Is Not A Valid Command")
      
      let array = await client.db.get(`${message.guild.id}.disabledCommands`)
      if (array && array.includes(args[1].toLowerCase())) return client.embeds.error(message, "That Command Is Already Disabled")
      
      await client.db.push(`${message.guild.id}.disabledCommands`, args[1].toLowerCase())
      return client.embeds.success(message, "Successfully Disabled That Command")
      
    }
  }
}
