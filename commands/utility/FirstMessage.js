const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "firstmessage",
  description: "Shows The First Message Of The Channel You Run The Command In Or If Mentioned",
  usage: "<#Channel (Optional)>",
  run: async (client, message, args) => {
    
    let channel = message.mentions.channels.first() || message.channel
    const fetchMessages = await channel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const msg = fetchMessages.first();

    if (!msg || !fetchMessages || !msg.content) return client.embeds.error(message, "Error Occurred")
    if (msg.author.bot) return client.embeds.normal(message, "First Message", "First Message In That Channel Was By A Bot")
    
    message.channel.send(
      new MessageEmbed()
      .setColor(client.color(message))
      .setTitle(`First Messsage in ${channel.name}`)
      .setURL(msg.url)
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .addField("Author", msg.author, true)
      .addField("Content", `\`\`\`${msg.content}\`\`\``)
      .addField('Message ID', `\`\`\`${msg.id}\`\`\``, true)
      .addField('Created At', `\`\`\`${moment(message.createdAt)}\`\`\``, true)
    );
}
}