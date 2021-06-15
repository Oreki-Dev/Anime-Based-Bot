const fetch = require("node-fetch");

module.exports = {
name: "clyde",
description: "Shows Up Your Text As If Clyde Is Sending Them",
usage: "<Text>",
run: async(client, message, args) => {

let text = args.join(" ")
if (!text) return client.embeds.error(message, "Baka! Give Some Text For Clyde")

const data = await fetch(`https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`)
    .then(res => res.json())
    .catch(() => null);

    if (!data) return client.embeds.error(message, "Api Currently Down")

  return message.channel.send({
    files: [{
      name: 'clyde.png',
      attachment: data.message
    }]
  })
}
}