const { MessageEmbed } = require('discord.js')
const animeQuotes = require('animequotes')
const KITSU = require('node-kitsu')

module.exports = {
name: "animequote",
description: "Shows A Random Anime Quote!",
aliases: ['aq','animequotes','aniquote','quotes'],
run: async (client, message, args) => {

let waembed = new MessageEmbed()
.setTitle("Please Wait While I Look For A Quote")
.setThumbnail(client.user.displayAvatarURL())
.setTimestamp()
.setColor(client.color(message)) 

let quotemsg = await message.channel.send(waembed)

let quote = animeQuotes.randomQuote();

if (quote.Error) {
  quote = animeQuotes.randomQuote();
}

if (quote.length>1) {
  quote = quote[Math.floor(Math.random()*(quote.length-1))]
}

KITSU.searchAnime(quote.anime,0).then(results => {
const finembed = new MessageEmbed()
.setColor(client.color(message))
.addField(`Quoted From ${quote.anime}`,`**"${quote.quote}"**\n\n-*${quote.name}*`)
.setTimestamp()

if (!results) {

} else if (!results[0].attributes) {
} else if (!results[0].attributes.coverImage) {
} else if (!results[0].attributes.coverImage.original) {
} else finembed.setImage(results[0].attributes.coverImage.original)

quotemsg.edit(finembed)
    
  })

}
}