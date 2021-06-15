const cooldown = {} 

module.exports.run = async(client, message) => {
  
  if (!message.guild || message.author.bot) return;
  
  let prefix = await client.db.get(`${message.guild.id}.prefix`);
  if (!prefix) prefix = client.config.prefix;
  
  let blacklistedServers = await client.db.get("Owner.blacklistedServers")
  let blacklistedUsers = await client.db.get("Owner.blacklistedUsers")
  
  let disabledCommands = await client.db.get(`${message.guild.id}.disabledCommands`)
  
  const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
   if (message.content.match(mentionRegex) && !blacklistedServers.includes(message.guild.id) && !blacklistedUsers.includes(message.author.id)) return client.embeds.normal(message, `Hello ${message.author.tag},`, `My Prefix In This Guild Is ${prefix}`)
   
  if (!message.content.startsWith(prefix)) {
    let arx = await client.db.get(`${message.guild.id}.ar`)
    if (arx) {
      let array = arx.map(ar => ar.name)
     let ary = arx.find(ar => message.content.includes(array))
     if (ary) return message.channel.send(ary.response)
    } else {
      return;
    }
  }
  
  if (!message.member)
    message.member = await message.guild.members.fetch(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;
  
  let cmdx = await client.db.get(`${message.guild.id}.tags`)

  if(cmdx) {
   let cmdy = cmdx.find(x => x.name === cmd)
   if(cmdy) message.channel.send(cmdy.response)
}
  
  if (blacklistedServers && blacklistedServers.includes(message.guild.id)) return client.embeds.normal(message, "Server Blacklisted", "Sorry, But This Server Is Blacklisted")
  
  if (blacklistedUsers && blacklistedUsers.includes(message.author.id)) return client.embeds.normal(message, "User Blacklisted", "Sorry, But You're Blacklisted")
  
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd))
  if (!command) return;
  
  if (command.botPermission) {
    let neededPerms = []
    command.botPermission.forEach(p => {
      if (!message.guild.me.hasPermission(p)) neededPerms.push(p)
    })
    
    if (neededPerms.length) return client.embeds.error(message, `I Need ${neededPerms.join(" ")} Permissions`)
  }
  if (command.authorPermission) {
    let neededPerms = []
    command.authorPermission.forEach(p => {
      if (!message.member.hasPermission(p))
      neededPerms.push(p)
    })

    if (neededPerms.length) return client.embeds.error(message, `${neededPerms.join(", ")} Permission Needed`)
  }
  
  if (command.ownerOnly && !client.config.owners.includes(message.author.id)) {
   return client.embeds.error(message, "Owner Only Command")
  }
  
  command.cooldown = 10000;

  let uCooldown = cooldown[message.author.id];

  if (!uCooldown) {
    cooldown[message.author.id] = {}
    uCooldown = cooldown[message.author.id]
  }

  let time = uCooldown[command.name] || 10000

  if (time && (time > Date.now()) && !client.config.owners.includes(message.author.id)) return client.embeds.error(message, `You Can Use This Command Again In ${Math.ceil((time - Date.now()) / 1000)} Second(s)`)

  cooldown[message.author.id][command.name] = Date.now() + command.cooldown;
  
  if (command) {
    if (disabledCommands && disabledCommands.includes(command.name)) return client.embeds.normal(message, "Command Disabled", "Sorry, That Command Is Diabled")
    
    command.run(client, message, args)
  }
}