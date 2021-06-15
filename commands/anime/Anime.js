const { MessageEmbed } = require("discord.js")
const { query } = require("../../Assets/Queries/Anime");

module.exports = {
  name: "anime",
  description: "Search Anime On Anilist",
  usage: "<Anime>",
  run: async(client, message, args) => {
    
let search = args.join(" ")
if (!search) return client.embeds.error(message, "Baka? What Anime Should I Search?")

let variables = { search: search, type: "ANIME" }

let { data } = await client.anilist.fetch(query, variables)

let embed = new MessageEmbed()
.setTitle(data.Media.title.english)
.setURL(data.Media.siteUrl)
.setColor(client.color(message))
.setDescription(data.Media.description.substring(0, 1000))
.setThumbnail(data.Media.coverImage.large)
.setImage(data.Media.coverImage.large)
.addField("Rating", data.Media.averageScore + '%')
.addField("Episodes", data.Media.episodes)
.addField("Genres", data.Media.genres)
.addField("Status", client.text.propercase(data.Media.status), true)
.setTimestamp()

message.channel.send(embed)

  }
}