module.exports = {
name: "glass",
description: "Glass An Image",
usage: "<@User/Id (Optional)>",
run: async(client, message, args) => {

let member = client.resolveMember(message, args, true)

return message.channel.send({
      files: [{
        name: 'glass.png',
        attachment: [
          'https://some-random-api.ml/canvas/glass?avatar=',
          member.user.displayAvatarURL({ format: 'png', size: 1024 })
        ].join('')
      }]
    });
}
}
