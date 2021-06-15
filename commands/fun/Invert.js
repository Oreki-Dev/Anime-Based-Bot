module.exports = {
  name: "invert",
  description: "Invert Someone's PFP",
  usage: "<@User/ID>",
  run: async(client, message, args) => {
    
    let member = client.resolveMember(message, args, true)
    
    return message.channel.send({
      files: [{
        name: 'inverted.png',
        attachment: [
          'https://some-random-api.ml/canvas/invert?avatar=',
          member.user.displayAvatarURL({ format: 'png', size: 1024 })
        ].join('')
      }]
    });
  }
}