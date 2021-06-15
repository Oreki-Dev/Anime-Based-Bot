const { MessageEmbed, GuildEmoji } = require('discord.js');
const _ = require('lodash');
const fetch = require('node-fetch');
const Paginate = require('../../Util/Paginate');
const types =  [ 'TV', 'ONA', 'OVA', 'Movie', 'Special', '-' ];

module.exports = {
  name: "upcoming",
  description: "Shows Details About Upcoming Anime",
  usage: "upcoming tv, upcoming ona, upcoming ova, upcoming movie, upcoming special",
  run: async(client, message, args) => {
    
    let type = args[0]
    if (type && types.some(x => x.toLowerCase() === type.toLowerCase())) {
      type = types[types.findIndex(c => c.toLowerCase() === type.toLowerCase())];
    } else {
      type = null;
    };
    
    let res = await fetch(`https://api.jikan.moe/v3/season/later`).then(res => res.json());

    if (!res || res.error) {
      res = res ? res : {};
      
      client.embeds.error(message, "An Unexpected Error Occurred")
    }
    
    if (types.includes(type)) {
      res.anime = res.anime.filter(f => f.type === type);
    };
    
    const chunks = 8;
    const descriptions = _.chunk(res.anime.map(anime => {
      return client.text.truncate([
        `[${anime.title}](https://myanimelist.net/anime/${anime.mal_id})`,
        `\`${[ !type ? ' ' + anime.type : null, client.text.joinArray(anime.genres.map(x => x.name))].filter(Boolean).join('\u2000\u2000|\u2000\u2000')} \``,
        anime.synopsis.replace(/\r\n/g,' ').replace('(No synopsis yet.)','')
      ].filter(Boolean).join('\n'), Math.floor(2000 / chunks))
    }), chunks);

    const pages = new Paginate();
    let index = 0;
    
    for (const anime of descriptions) {
      pages.add(
        new MessageEmbed()
        .setColor(client.color(message))
        .setTitle(`Upcoming Anime List\u2000|\u2000Type: ${type || 'ALL'}`)
        .setDescription(anime.join('\n\n'))
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Page ${index + 1} of ${descriptions.length}`));
      index++;
    };
    
    await message.channel.send(pages.firstPage).then(async(msg) => {
    
    if (pages.size === 1) {
      return;
    };

    const prev = '⏮️'
    const next = '⏭️'
    const terminate = '⏹️'

    const filter = (_, user) => user.id === message.author.id;
    const collector = msg.createReactionCollector(filter);
    const navigators = [ prev, next, terminate ];
    let timeout = setTimeout(()=> collector.stop(), 90000);

    for (let i = 0; i < navigators.length; i++) {
      await msg.react(navigators[i]);
    };

    collector.on('collect', async reaction => {

      switch(reaction.emoji.name){
        case prev instanceof GuildEmoji ? prev.name : prev:
          msg.edit(pages.previous());
        break;
        case next instanceof GuildEmoji ? next.name : next:
          msg.edit(pages.next());
        break;
        case terminate instanceof GuildEmoji ? terminate.name : terminate:
          collector.stop();
        break;
      };

      await reaction.users.remove(message.author.id);
      timeout.refresh();
    });

  collector.on('end', async () => await msg.reactions.removeAll());

})
  }
}