const { MessageEmbed } = require("discord.js");

module.exports = {
name: "invite",
description: "Fetches Bot's Invite Links",
run: async(client, message, args) => {
    
let embed = new MessageEmbed()
.setTitle("Invite Me To Your Server")
.setThumbnail(client.user.displayAvatarURL())
.addField("Invite Link (Full Perms)", `[Click](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1074072576&scope=bot)`)
.addField("Invite Link (No Perms)", `[Click](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot)`)
.setTimestamp()
.setColor(client.color(message))

message.channel.send(embed)
    }
}