const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'serverinfo',
  aliases: [ 'guild', 'server', 'serverstat', 'serverstats', 'guildstat', 'guildstats' ],
  description: 'Displays The Basic Information Of The Server',
 run: async (client, message, args) => {
   
         let realmembers = message.guild.members.cache.filter(member => !member.user.bot).size;
         let bots = message.guild.members.cache.filter(member => member.user.bot).size;
     message.channel.send(
    new MessageEmbed()
    .setColor(client.color(message))
    .setAuthor(`${message.guild.name} Server Information`, message.guild.iconURL())
         .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .addFields([
      {
        name: 'Server', inline: true,
        value: [
            '```',
          `Owner:\u2000${await message.guild.members.fetch(message.guild.ownerID).then(x => x.user.tag)}`,
          `Region:\u2000${message.guild.region.split('')[0].toUpperCase() + message.guild.region.slice(1)}`,
          `Verification Level:\u2000${message.guild.verificationLevel}`,
          `Boost:\u2000Level ${message.guild.premiumTier} (${message.guild.premiumSubscriptionCount} Boosts)`,
            '```'
        ].join('\n')
      },{
        name: 'Members', inline: true,
        value: [
            '```',
          `Count:\u2000${message.guild.memberCount}`,
          `Real:\u2000${realmembers}`,
          `Bots:\u2000${bots}`,
            '```'
        ].join('\n')
      },{
        name: 'Roles', inline: true,
        value: [
            '```',
          `Count:\u2000${message.guild.roles.cache.size - 1}`,
          `Unused Slot:\u2000${249 - message.guild.roles.cache.size}`,
          `Percent Used:\u2000${(message.guild.roles.cache.size/250*100).toFixed(2)}%`,
            '```'
        ].join('\n')
      },{
        name: 'Emojis (Static)', inline: true,
        value: [
            '```',
          `Count:\u2000${message.guild.emojis.cache.filter(x => !x.animated).size}`,
          `Unused Slot:\u2000${(50*(message.guild.premiumTier===3?5:message.guild.premiumTier+1))-message.guild.emojis.cache.filter(x=>!x.animated).size}`,
          `Percent Used:\u2000${message.guild.emojis.cache.filter(x=>!x.animated).size/(50*(message.guild.premiumTier===3?5:message.guild.premiumTier+1))*100}%`,
            '```'
        ].join('\n')
      },{
        name: 'Emojis (Animated)', inline: true,
        value: [
            '```',
          `Count:\u2000${message.guild.emojis.cache.filter(x => x.animated).size}`,
          `Unused Slot:\u2000${(50*(message.guild.premiumTier===3?5:message.guild.premiumTier+1))-message.guild.emojis.cache.filter(x=>x.animated).size}`,
          `Percent Used:\u2000${message.guild.emojis.cache.filter(x=>x.animated).size/(50*(message.guild.premiumTier===3?5:message.guild.premiumTier+1))*100}%`,
            '```'
        ].join('\n')
      },{
        name: 'Channels', inline: true,
        value: [
            '```',
          `Count:\u2000Text(${message.guild.channels.cache.filter(x=>x.type==='text').size})\u2000Voice(${message.guild.channels.cache.filter(x=>x.type==='voice').size})\u2000Category(${message.guild.channels.cache.filter(x=>x.type==='category').size})`,
          `Unused Slot:\u2000${500-message.guild.channels.cache.size}`,
          `Percent Used:\u2000${(message.guild.emojis.cache.size/500*100).toFixed(2)}%`,
            '```'
        ].join('\n')
      },{
        name: 'Created',
        value: `\`\`\`${moment(message.guild.createdAt).format('dddd, do MMMM YYYY')}\`\`\``
      }
    ])
  )
    
     }
};