module.exports = {
name: "pixelate",
description: "Pixelate An Image",
usage: "<@User/Id (Optional)>",
run: async(client, message, args) => {

let member = client.resolveMember(message, args, true)

return message.channel.send({
      files: [{
        name: 'pixelate.jpg',
        attachment: [
          'https://some-random-api.ml/canvas/pixelate?avatar=',
          member.user.displayAvatarURL({ format: 'png', size: 1024 })
        ].join('')
      }]
    });
}
}
