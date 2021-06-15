const { MessageEmbed } = require("discord.js");
const permissions = [
  'CREATE_INSTANT_INVITE',
  'KICK_MEMBERS',
  'BAN_MEMBERS',
  'ADMINISTRATOR',
  'MANAGE_CHANNELS',
  'MANAGE_GUILD', 
  'ADD_REACTIONS',
  'VIEW_AUDIT_LOG',
  'PRIORITY_SPEAKER',
  'STREAM',
  'VIEW_CHANNEL',
  'SEND_MESSAGES',
  'SEND_TTS_MESSAGES',
  'MANAGE_MESSAGES',
  'EMBED_LINKS',
  'ATTACH_FILES',
  'READ_MESSAGE_HISTORY',
  'MENTION_EVERYONE',
  'USE_EXTERNAL_EMOJIS',
  'VIEW_GUILD_INSIGHTS',
  'CONNECT',
  'SPEAK',
  'MUTE_MEMBERS',
  'DEAFEN_MEMBERS',
  'MOVE_MEMBERS',
  'USE_VAD',
  'CHANGE_NICKNAME',
  'MANAGE_NICKNAMES',
  'MANAGE_ROLES',
  'MANAGE_WEBHOOKS',
  'MANAGE_EMOJIS',
]

module.exports = {
name: "permissions",
aliases: ["perms"],
description: "Shows All The Permissions You Have",
usage: "<@User (Optional)>",
run: async(client, message, args) => {

const yes = '✅'
const no = '❌'
const s = '📛'
const c = '♨️'

let channel = message.channel
let member = client.resolveMember(message, args, true)

let description = `Server - ${s}\nCurrent Channel - ${c}\n\n${s} | ${c}\n`

let embed = new MessageEmbed()
.setTitle(`${member.user.username}'s Permissions`)
.setColor(client.color(message))
permissions.forEach(perm => { 
 description += `${member.permissions.has(perm) ? yes : no} | ${channel.permissionsFor(member.id).has(perm) ? yes : no} - ${caps(perm)}\n` 
})
embed.setDescription(description)

return message.channel.send(embed)
}
}

function caps(text) {
    if (typeof text != 'string') throw new Error('Param should be a string')
    return text.toLowerCase().replace(/_/g, ' ').replace(/\b[a-zA-Z]/g, m => m.toUpperCase())
}