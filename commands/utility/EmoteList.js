
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emotelist",
  description: "Shows all the emojis available in the server",
  aliases: ["emojilist", "serveremojis"],
  run: async (client, message, args) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;

    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed = new MessageEmbed()
      .setTitle(`Emojis in ${message.guild.name} | Emojis [${OverallEmojis}] `)
      .setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Non Animated [${EmojiCount}]**:\n${Emojis}`
      )
      .setColor(client.color(message));

    if (Embed.length > 2000) {
      return client.embeds.error(message, "Emote List Exceeded Embed Limit");
    } else {
      message.channel.send(Embed);
    }
  },
};