const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const moment = require('moment');

module.exports = {
  name: "malprofile",
  aliases: ["malof"],
  run: async(client, message, args) => {
    
    const query = args.join(' ');
    if (!query) return client.embeds.error(message, "Who's Profile Are You Searching? Baka!")
    
    const response = await fetch(`https://api.jikan.moe/v3/user/${encodeURI(query)}/profile`)
    .then(res => res.json())
    .catch(() => {});
    
    if (!response || response.status) return client.embeds.error(message, "Mal Error, Maybe Try Giving Valid User of Mal")
    
    const fav_anime = client.text.joinArrayAndLimit(response.favorites.anime.map((entry) => {
      return `[${entry.name}](${entry.url.split('/').splice(0,5).join('/')})`;
    }), 1000, ' • ');
    const fav_manga = client.text.joinArrayAndLimit(response.favorites.manga.map((entry) => {
      return `[${entry.name}](${entry.url.split('/').splice(0,5).join('/')})`;
    }), 1000, ' • ');
    const fav_characters = client.text.joinArrayAndLimit(response.favorites.characters.map((entry) => {
      return `[${entry.name}](${entry.url.split('/').splice(0,5).join('/')})`;
    }), 1000, ' • ');
    const fav_people = client.text.joinArrayAndLimit(response.favorites.people.map((entry) => {
      return `[${entry.name}](${entry.url.split('/').splice(0,5).join('/')})`;
    }), 1000, ' • ');
    
    return message.channel.send(
      new MessageEmbed()
      .setColor(client.color(message))
      .setTimestamp()
      .setAuthor(`${response.username}'s Profile`, response.image_url, response.url)
      .setDescription([
        client.text.truncate((response.about || '').replace(/(<([^>]+)>)/ig, ''), 350, `...[Read More](${response.url})`),
        `• **Gender**:\u2000\u2000${response.gender || 'Unspecified'}`,
        `• **From**\u2000\u2000${response.location || 'Unspecified'}`,
        `• **Joined MAL - **${moment(response.joined).format('dddd, do MMMM YYYY')}, *${moment(response.joined).fromNow()}*`,
        `• **Last Seen - **${moment(response.last_online).format('dddd, do MMMM YYYY')}, *${moment(response.last_online).fromNow()}*`
      ].join('\n'))
      .addFields([
        {
          name: 'Anime Stats', inline: true,
          value: '```fix\n' + Object.entries(response.anime_stats).map(([key, value]) => {
            const cwidth = 28;
            const name = key.split('_').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');
            const spacing = ' '.repeat(cwidth - (3 + name.length + String(value).length));

            return ' • ' + name + ':' + spacing + value;
          }).join('\n') + '```'
        },{
          name: 'Manga Stats', inline: true,
          value: '```fix\n' + Object.entries(response.manga_stats).splice(0,10).map(([key, value]) => {
            const cwidth = 28;
            const name = key.split('_').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ');
            const spacing = ' '.repeat(cwidth - (3 + name.length + String(value).length));

            return ' • ' + name + ':' + spacing + value;
          }).join('\n') + '```'
        },{
          name: 'Favorite Anime',
          value: fav_anime.text + (!!fav_anime.excess ? ` and ${fav_anime.excess} more!` : '') || 'None Listed.'
        },{
          name: 'Favorite Manga',
          value: fav_manga.text + (!!fav_manga.excess ? ` and ${fav_manga.excess} more!` : '') || 'None Listed.'
        },{
          name: 'Favorite Characters',
          value: fav_characters.text + (!!fav_characters.excess ? ` and ${fav_characters.excess} more!` : '') || 'None Listed.'
        },{
          name: 'Favorite Staffs',
          value: fav_people.text + (!!fav_people.excess ? ` and ${fav_people.excess} more!` : '') || 'None Listed.'
        }
      ])
    );
  }
}