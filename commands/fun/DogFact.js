const fetch = require("node-fetch");

module.exports = {
name: "dogfact",
description: "Shows Up Dog Fact",
run: async(client, message, args) => {

const data = await fetch('https://some-random-api.ml/facts/dog')
    .then(res => res.json())
    .catch(() => null);

    if (!data) return client.embeds.error(message, "Api Currently Down")

  return client.embeds.normal(message, "Dog Fact", data.fact)
}
}
