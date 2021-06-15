module.exports = {
  name: "comment",
  aliases: ["ytcomment"],
  run: async(client, message, args) => {
    return message.channel.send({ files: [{
      name: 'youtube.png',
      attachment: [
        'https://some-random-api.ml/canvas/youtube-comment?avatar=',
        message.author.displayAvatarURL({format: 'png', size:1024}),
        `&username=${message.member.displayName}`,
        `&comment=${args.join(' ')}`
      ].join('')
    }]})
  }
}