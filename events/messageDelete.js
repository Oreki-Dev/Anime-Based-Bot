module.exports.run = (client, message) => {
  
  if (message.author.bot) return;
  if (!client.snipes.get(message.channel.id)) client.snipes.set(message.channel.id, []);
  const snipes = client.snipes.get(message.channel.id);
  const obj = {
    message,
    ts: Date.now(),
    author: message.author,
    avatar: message.author.displayAvatarURL({ dynamic: 1 }),
    attachments: message.attachments
  };
  client.snipes.set(message.channel.id, snipes.concat([obj]));

}