const discord = require("discord.js");

module.exports = {
  name: "addemote",
  aliases: ["steal"],
  description: "Add An Emote To Server",
  usage: "<Emote/Link>",
  botPermission: ["MANAGE_EMOJIS"],
  authorPermissions: ["MANAGE_EMOJIS"],
  run: async(client, message, args) => {
    
    try {
    let emote = args[0];
    if (!emote) return client.embeds.error(message, "Provide An Emote Or Link")
    
    let link;
    let name;
    if (client.utils.isUrl(emote) === true) {
      
      name = args[1];
      if (!name) return client.embeds.error(message, "Provide An Name For The Emoji, Baka!")
      link = emote;
    } else {
      emote = discord.Util.parseEmoji(emote)
      link = `https://cdn.discordapp.com/emojis/${emote.id}.${
       emote.animated ? "gif" : "png"}`
       name = args[1] ? args[1] : emote.name
    }
    
    message.guild.emojis.create(link, name)
    
    client.embeds.success(message, "Emote Created")
    } catch (e) {
      return client.embeds.error(message, "Couldn't Add That Emote")
    }
  }
}