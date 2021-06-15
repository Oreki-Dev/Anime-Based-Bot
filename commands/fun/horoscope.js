const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const signs = {
  cancer: '♋',
  aquarius: '♒',
  aries: '♈',
  taurus: '♉',
  virgo: '♍',
  scorpio: '♏',
  libra: '♎',
  gemini: '♊',
  leo: '♌',
  sagittarius: '♐',
  capricorn: '♑',
  pisces: '♓'
}

module.exports = {
  name: "horoscope",
  description: "Checks Today's Horoscope",
  usage: "<Sign>",
  run: async(client, message, args) => {
    
    let sign = args[0];
    if (!sign) return client.embeds.error(message, "What Sign's Horoscope Should I Check? Baka!");
    
    if (!Object.keys(signs).includes(sign.toLowerCase())) return client.embeds.error(message, "That Is Not A Valid Sign")
    
    const data = await fetch(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`)
    .then(res => res.json())
    .catch(() => null);

    if (!data) return client.embeds.error(message, "Error Occurred");
    
    return message.channel.send(
      new MessageEmbed()
      .setColor(client.color(message))
      .setTimestamp()
      .setAuthor(signs[sign.toLowerCase()] + ' ' + data.sunsign || sign)
      .setDescription(data.horoscope.replace('(c) Kelli Fox, The Astrologer, http://new.theastrologer.com', ''))
      .addFields([
        { name: 'Mood', inline: true, value: data.meta.mood || '\u200b' },
        { name: 'Intensity', inline: true, value: data.meta.intensity || '\u200b' },
        { name: 'Keywords', inline: true, value: data.meta.keywords || '\u200b' }
      ])
    );
  }
}