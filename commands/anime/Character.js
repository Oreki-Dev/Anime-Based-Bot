const { MessageEmbed } = require("discord.js");
const { query } = require("../../Assets/Queries/Character");

module.exports = {
  name: "character",
  description: "Search Info About A Character On Anilist",
  run: async(client, message, args) => {
    
let search = args.join(" ");
if (!search) return client.embeds.error(message, "Baka? What Character Should I Search?")

let variables = { search: search } 

let { data } = await client.anilist.fetch(query, variables)
    
if (!data.Character) return client.embeds.error(message, "Couldn't Find That Character")
    
let embed = new MessageEmbed()
.setTitle(data.Character.name.first + ' '+ data.Character.name.last)
.setURL(data.Character.siteUrl)
.setThumbnail(data.Character.image.large)
.setImage(data.Character.image.large)
.setColor(client.color(message))
.setDescription(data.Character.description.substring(0, 1000))
    
   return message.channel.send(embed)
  }
}