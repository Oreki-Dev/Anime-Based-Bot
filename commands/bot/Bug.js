module.exports = {
name: "bug", 
description: "Report A Bug To The Developer",
usage: "<Bug>",
run: async(client, message, args) => {

let channel = client.channels.cache.get(client.config.bugChannel)

if (args.length < 5) return client.embeds.error(message, "Specify The Bug You're Reporting")

channel.send({ embed: {
title: `New Bug, Reported By ${message.author.tag}`,
description: `\`\`\`${args.join(" ")}\`\`\``,
color: client.color(message),
thumbnail: {
url: client.user.displayAvatarURL()
},
timestamp: new Date()
}});

client.embeds.success(message, "Reported The Bug, Thanks")
}
}