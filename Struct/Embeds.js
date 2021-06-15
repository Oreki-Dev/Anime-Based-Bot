module.exports = class Embeds {
  constructor(client) {
    this.client = client;
  }
  
  normal(message, title, desc) {
    message.channel.send({ embed: {
     title: title,
     description: `\`\`\`${desc}\`\`\``,
     color: this.client.color(message),
     thumbnail: {
         url: this.client.user.displayAvatarURL()
         },
     timestamp: new Date()
     }})
  }
  
  success(message, desc) {
    message.channel.send({ embed: {
     title: "Success",
     description: `\`\`\`${desc}\`\`\``,
     color: this.client.color(message),
     thumbnail: {
         url: this.client.user.displayAvatarURL()
         },
     timestamp: new Date()
     }})
  }
  
  error(message, desc) {
    message.channel.send({ embed: {
     title: "Error",
     description: `\`\`\`${desc}\`\`\``,
     color: this.client.color(message),
     thumbnail: {
         url: this.client.user.displayAvatarURL()
         },
     timestamp: new Date()
     }})
  }
}