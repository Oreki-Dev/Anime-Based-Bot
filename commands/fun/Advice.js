const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "advice",
  description: "Sends An Advice",
  run: async(client, message, args) => {

let advicetry = await fetch('https://api.adviceslip.com/advice')
let Advice = await advicetry.json();

let adviceembed = new MessageEmbed()
.setColor(client.color(message))
.setThumbnail(client.user.displayAvatarURL())
.addField("Random Advice",`${Advice.slip.advice}`)
.setTimestamp()

message.channel.send(adviceembed)
  }
}