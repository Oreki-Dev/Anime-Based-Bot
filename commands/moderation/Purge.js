const moment = require("moment")
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  aliases: ["clear", "prune"],
  description: "Delete Number Of Messages",
  usage: "<Number>",
  botPermission: ["MANAGE_MESSAGES"],
  authorPermission: ["MANAGE_MESSAGES"],
  run: async(client, message, args) => {
    
    let quantity = args[0]
    if (isNaN(quantity)) return client.embedError(message.channel, "Baka! Give A Number")
    quantity = Math.round(quantity);
    
    if (!quantity || quantity < 2 || quantity > 100) return client.embedError(message.channel, "Baka! Provide A Number Between 2 To 100")

    return message.channel.bulkDelete(quantity, true)
    .then(async(messages) => {

      const count = messages.size;
      const _id = Math.random().toString(36).slice(-7);
      const uploadch = client.channels.cache.get(client.config.uploadChannel)

      messages = messages.filter(Boolean).map(message => {
        return [
          `[${moment(message.createdAt).format('dddd, do MMMM YYYY hh:mm:ss')}]`,
          `${message.author.tag} : ${message.content}\r\n\r\n`
        ].join(' ');
      });

      messages.push(`Messages Cleared on ![](${message.guild.iconURL({size: 32})}) **${message.guild.name}** - **#${message.channel.name}** --\r\n\r\n`);
      messages = messages.reverse().join('');

      const res = uploadch ? await uploadch.send({ files: [{ attachment: Buffer.from(messages), name: `MessageDelete-${_id}.txt`}]}
      ).then(message => [message.attachments.first().url, message.attachments.first().id])
      .catch(() => ['', null]) : ['', null];

      const url = (res[0].match(/\d{17,19}/)||[])[0];
      const id = res[1];
      
      let embed = new MessageEmbed()
      .setTitle(`Success`)
      .setColor(client.color(message))
      .setDescription([
          `[View Deleted Messages](${url ? `https://txt.discord.website/?txt=${url}/${id}/MessageDelete-${_id}`:''})`,
          `[Download Deleted Messages](${res[0]})`
        ].join('\n'))
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp()
      
      message.channel.send(embed)
    })
  }
}