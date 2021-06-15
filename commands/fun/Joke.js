const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "joke",
  description: "Sends A Joke",
  run: async(client, message, args) => {

let joketry = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
let joke = await joketry.json();

let jokeembed = new MessageEmbed()
.setColor(client.color(message)) 
.addField("Question",`${joke.setup}`)
.addField("Answer",`${joke.delivery}`)
.setThumbnail(client.user.displayAvatarURL())
.setTimestamp()
    
 message.channel.send(jokeembed)
    
    
  }
}