module.exports = {
  name: "lock",
  aliases: ["lockdown", "lockchannel"],
  description: "Lockdown A Channel",
  usage: "<#Channel> (Optional)",
  botPermission: ["MANAGE_CHANNELS"],
  authorPermission: ["MANAGE_CHANNELS"],
  run: async(client, message, args) => {
    
    let channel = message.mentions.channels.first() || message.channel
    if (!channel.permissionsFor(message.guild.roles.everyone)
        .has('SEND_MESSAGES')) return client.embeds.error(message, "Channel Is Already Locked Down")
        
    channel.updateOverwrite(message.guild.id, {   
        SEND_MESSAGES: false  
      });
      
      return client.embeds.success(message, "Channel Locked")
  }
}