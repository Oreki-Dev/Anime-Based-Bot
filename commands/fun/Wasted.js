module.exports = {
name: "wasted",
description: "Sends The Wasted Meme",
usage: "<@User/Id (Optional)>",
run: async(client, message, args) => {

let member = client.resolveMember(message, args, true)

return message.channel.send({
      files: [{
        name: 'wasted.png',
        attachment: [
          'https://some-random-api.ml/canvas/wasted?avatar=',
          member.user.displayAvatarURL({ format: 'png', size: 1024 })
        ].join('')
      }]
    });
}
}
