const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
  name: "pokemon",
  description: "Search Info For A Pokemon",
  usage: "<Pokemon>",
  run: async(client, message, args) => {
    
    const query = args.join(' ')
    if (!query) return client.embeds.error(message, "Baka! What Pokemon's Info Should I Search?")
    
    const data = await fetch(`https://some-random-api.ml/pokedex?pokemon=${encodeURI(query)}`)
    .then(res => res.json())
    .catch(()=> null);
    
    if (!data || data.error) return client.embeds.error(message, "Pokedex Error")
    
    data.sprites = data.sprites || {};
    data.stats = data.stats || {};
    data.family.evolutionLine = data.family.evolutionLine || [];
    
    let embed = new MessageEmbed()
    .setColor(client.color(message))
    .setThumbnail(data.sprites.animated || data.sprites.normal || null)
    .setAuthor(`Pokédex entry #${data.id} ${data.name.toUpperCase()}`,'https://i.imgur.com/uljbfGR.png', 'https://pokemon.com/us')
    .addFields([
      { name: 'Info', value: data.description || '???' },
      { name: 'Type', value: data.type.join('\n') || '???', inline: true },
      { name: 'Abilities', value: data.abilities.join('\n') || '???', inline: true },
      {
        name: 'Build', inline: true,
        value: [
          `Height: **${data.height || '???'}**`,
          `Weight: **${data.weight || '???'}**`,
          `Gender: **${client.text.joinArray(data.gender)}**`
        ].join('\n')
      },
      { name: 'Egg Groups', value: data.egg_groups.join('\n') || '???', inline: true },
      {
        name: 'Stats', inline: true,
        value: [
           `HP: **${data.stats.hp || '???'}**`,
           `ATK: **${data.stats.attack || '???'}**`,
           `DEF: **${data.stats.defense || '???'}**`
        ].join('\n')
      },
      {
        name: 'SP.Stats', inline: true,
        value: [
          `SP.ATK: **${data.stats.sp_atk || '???'}**`,
          `SP.DEF: **${data.stats.sp_def || '???'}**`,
          `SPEED: **${data.stats.speed || '???'}**`
        ].join('\n')
      },
      { name: 'Generation', value: data.generation || '???', inline: true },
      { name: 'Evolution Stage', value: client.text.ordinalize(data.family.evolutionStage || '???'), inline: true },
      { name: 'Evolution Line', value: data.family.evolutionLine.join(' \\👉 ') || '???', inline: true }
    ]);
    
    message.channel.send(embed)
  }
}