const { duration } = require("moment");
require('moment-duration-format');
let { query } = require("../../Assets/Queries/NextAirDate");

module.exports = {
  name: "nextairdate",
  aliases: ["next"],
  description: "Search Next Aiing Date Of An Anime Episode",
  usage: "<Anime>",
  run: async(client, message, args) => {
    
let search = args.join(' ')
if (!search) return client.embeds.error(message, "Baka? What Anime's Next Episodes Date Should I Search?")
    
const variables = { search , status: 'RELEASING'}

let { data } = await client.anilist.fetch(query, variables)

if (!data.Media) return client.embeds.error(message, "Couldn't Find That Anime")

client.embeds.normal(message, `Episode ${data.Media.nextAiringEpisode.episode} Of ${data.Media.title.english} Airs In`, `${duration(data.Media.nextAiringEpisode.timeUntilAiring, "seconds").format('D [days] H [hours and] m [minutes]')}`)
  }
}