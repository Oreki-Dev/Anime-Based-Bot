const fetch = require("node-fetch");

module.exports = {
name: "foxfact",
description: "Shows Up Fox Fact",
run: async(client, message, args) => {

const data = await fetch('https://some-random-api.ml/facts/fox')
    .then(res => res.json())
    .catch(() => null);

    if (!data) return client.embeds.error(message, "Api Currently Down")

  return client.embeds.normal(message, "Fox Fact", data.fact)
}
}
