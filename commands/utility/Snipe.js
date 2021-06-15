const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "Shows Up Last Deleted Messages",
  run: async(client, message, args) => {
const snipes = client.snipes.get(message.channel.id);
if (!snipes) return client.embeds.error(message, "Nothing To Snipe, Baka!");
const num = args[0] || 1;
const snipe = (snipes.reverse()) [num - 1];
if (!snipe) return client.embeds.error(message, `No Snipe Message With Number ${num} Found, Baka!`);

const e = new MessageEmbed()
.setAuthor(`${snipe.author.tag} (${snipe.author.id})`, snipe.avatar)
.setDescription(snipe.message.content)
.setColor(client.color(message))
.setTimestamp(snipe.ts)
.setFooter(`${num}/${snipes.length}`);
if (snipe.attachments.first()) e.setImage(snipe.attachments.first().url);

message.channel.send({ embed: e });
snipes.reverse();
  }
}