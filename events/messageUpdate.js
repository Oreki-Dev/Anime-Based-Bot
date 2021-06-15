module.exports.run = (client, oldMessage, newMessage) => {
  
  if (!oldMessage.author || !newMessage.author || newMessage.author.bot || oldMessage.author.bot) return;
  if (!client.esnipes.get(oldMessage.channel.id)) client.esnipes.set(oldMessage.channel.id, []);
  const esnipes = client.esnipes.get(oldMessage.channel.id);
  const obj = { 
    oldMessage, 
    newMessage, 
    editedAt: Date.now() 
  }; 
  client.esnipes.set(oldMessage.channel.id, esnipes.concat([obj]));
}