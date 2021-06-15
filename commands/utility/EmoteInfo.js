const Discord = require("discord.js");

module.exports = {
  name: "emoteinfo",
  aliases: ["jumbo", "big"],
  description: "View Enlarged Version Of The Emote",
  usage: "<Emote/Emote-Name>",
  run: async(client, message, args) => {
const emoji = args[0];
if (!emoji) return client.embeds.error(message, "Provide An Emote Too, Baka!")
let customEmoji = Discord.Util.parseEmoji(emoji) || message.guild.emojis.cache.find(e => e.name === emoji);
if (!customEmoji) return client.embeds.error(message, "Couldn't Find That Emote")

const embed = new Discord.MessageEmbed() 
.setTitle(`Emote | ${emoji}`)   
.setColor(client.color(message))
.setThumbnail(client.user.displayAvatarURL())
if (customEmoji.id) {
embed.setImage(`https://cdn.discordapp.com/emojis/${customEmoji.id}.${customEmoji.animated ? "gif" : "png"}`)
embed.addField("Emote ID", `\`\`\`${customEmoji.id}\`\`\``)
embed.addField("Animated", `\`\`\`${customEmoji.animated ? "Yes" : "No"}\`\`\``)   
embed.addField("Download Link", `[Link To Emote](https://cdn.discordapp.com/emojis/${customEmoji.id}.${customEmoji.animated ? "gif" : "png"})`)   
return message.channel.send(embed);
    } else return client.embeds.error(message, "Couldn't Fetch That Emote")

  }
}