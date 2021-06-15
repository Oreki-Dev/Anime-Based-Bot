module.exports = {
  name: "autoresponses",
  aliases: ["ar"],
  description: "Create, Delete Or List Auto Responses (Different From Tags)",
  usage: "create <word> <response> | delete <word> | list",
  authorPermission: ["ADMINISTRATOR"],
  run: async(client, message, args) => {
    
    if (!args[0]) return client.embeds.normal(message, "Available Sub Commands", "ar create <Word> <Response>\nar delete <Word>\nar list")
    
    if (args[0].toLowerCase() === 'create') {

      if (!args[1] || !args.slice(2).join(" ")) return client.embeds.error(message, "Usage -\nar create [type] [word] [response]")
      
      let data = await client.db.get(`${message.guild.id}.ar`);
      if (data && data.find(ar => ar.name === args[1].toLowerCase())) return client.embeds.error(message, "Auto Response With That Name Is Already Made");
      
      let data2 = {
        name: args[1].toLowerCase(),
        response: args.slice(2).join(" ")
      }
      
      await client.db.push(`${message.guild.id}.ar`, data2)
      return client.embeds.success(message, "Auto Response Created")
    }
    
    if (args[0].toLowerCase() === 'delete') {
      if (!args[1]) return client.embeds.error(message, "Which Auto Response Should I Delete?")
      
      let data = await client.db.get(`${message.guild.id}.ar`)
      if (data && !data.find(ar => ar.name === args[1].toLowerCase())) return client.embeds.error(message, "There Is No Such Auto Response Created")
      
      let index = data.filter(ar => ar.name !== args[1].toLowerCase()) 
      
      await client.db.set(`${message.guild.id}.ar`, index)
      return client.embeds.success(message, "Deleted That Auto Response")
    }
    
    if (args[0].toLowerCase() === 'list') {
      let data = await client.db.get(`${message.guild.id}.ar`);
      let array;
      
      if (data && data.length) {
        array = [];
        data.forEach(ar => {
          array.push(ar.name)
        });
      }
      
      return client.embeds.normal(message, "Auto Responses", `${array ? array.join("\n") : "No Auto Responses"}`)
    }
  }
}