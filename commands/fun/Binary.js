const fetch = require("node-fetch");

module.exports = {
name: "binary",
description: "Converts Your Text Into Binary",
usage: "<Text>",
run: async(client, message, args) => {

let text = args.join(" ")
if (!text) return client.embeds.error(message, "What Should I Convert, Give Me Some Text! Baka!")

const data = await fetch(`https://some-random-api.ml/binary?text=${text}`)
    .then(res => res.json())
    .catch(() => null);

    if (!data) return client.embeds.error(message, "Api Currently Down")

  return client.embeds.normal(message, "Binary String", data.binary)
}
}
