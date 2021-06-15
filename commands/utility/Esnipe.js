const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "editsnipe",
  aliases: ["esnipe"],
  description: "Shows Last Edited Message",
  run: async(client, message, args) => {
const editSnipes = client.esnipes.get(message.channel.id); 
if (!editSnipes) return client.embeds.error(message, "No Edit Snipes In This Channel, Baka!")
const num = args[0] || 1;
const editSnipe = (editSnipes.reverse()) [num - 1];
if (!editSnipe) return client.embeds.error(message, `No Edit-Snipe Message With That ${num} Found, Baka!`);

const e = new MessageEmbed()
.setAuthor(`${editSnipe.oldMessage.author.tag} (${editSnipe.oldMessage.author.id})`, editSnipe.oldMessage.author.avatarURL({ dynamic: 1 }))
.addField("Old Message", editSnipe.oldMessage.content || "Nothing")
.addField("New Message", editSnipe.newMessage.content || "Nothing")
.setColor(client.color(message))
.setFooter(`${num}/${editSnipes.length}`)
.setTimestamp(editSnipe.editedAt);
if (editSnipe.oldMessage.attachments.first()) e.setImage(editSnipe.oldMessage.attachments.first().url);
editSnipes.reverse();
       
message.channel.send({ embed: e });

  }
}