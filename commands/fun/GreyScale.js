module.exports = {
  name: "greyscale",
  description: "GreyScale An Image",
  usage: "<@User/Id (Optinal)>",
  run: async(client, message, args) => {
    
    let member = client.resolveMember(message, args, true)
    
    return message.channel.send({
      files: [{
        name: 'inverted.png',
        attachment: [
          'https://some-random-api.ml/canvas/greyscale?avatar=',
          member.user.displayAvatarURL({ format: 'png', size: 1024 })
        ].join('')
      }]
    });
  }
}