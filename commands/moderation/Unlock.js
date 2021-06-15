module.exports = {
  name: "unlock",
  aliases: ["unlockdown", "unlockchannel"],
  description: "Unlock The Channel",
  usage: "<Unlock (Optional)>",
  botPermission: ["MANAGE_CHANNELS"],
  authorPermission: ["MANAGE_CHANNELS"],
  run: async(client, message, args) => {
    let channel = message.mentions.channels.first() || message.channel;
    
    if (channel.permissionsFor(message.guild.roles.everyone).has("SEND_MESSAGES")) return client.embeds.error(message, "Channel Is Not Locked")
    
   channel.updateOverwrite(message.guild.id, {   
       SEND_MESSAGES: null 
      });
      
      return client.embeds.success(message, "Channel Unlocked")
  }
}