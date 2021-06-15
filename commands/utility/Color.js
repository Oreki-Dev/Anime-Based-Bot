const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'color',
  aliases: [ 'colour', 'hex' ],
  description: 'Shows A Random Color Or A Preview Of The Given Color',
  usage: '<Hex Code>',
  run: (client, message, args) => {
    
    let hex = args[0] || "#" + Math.floor(Math.random() * 16777215).toString(16);
    
    const color = hex.match(/[0-9a-f]{6}/) 
    
    let embed = new MessageEmbed()
      .setColor(`#${color}`)
      .setTitle(`#${color}`)
      .setImage('https://dummyimage.com/200/' + color)
      .setTimestamp()
      
    message.channel.send(embed)
}
}