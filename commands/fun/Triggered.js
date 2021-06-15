module.exports = {
  name: "triggered",
  description: "Triggers Users",
  usage: "<@User/User-ID>",
  run: async(client, message, args) => {
    
    let member = client.resolveMember(message, args, true)
    
    return message.channel.send({
      files: [{
        name: 'triggered.gif',
        attachment: [
          'https://some-random-api.ml/canvas/triggered?avatar=',
          member.user.displayAvatarURL({ format: 'png', size: 1024 })
        ].join('')
      }]
    });
  }
}