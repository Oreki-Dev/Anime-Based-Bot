const fetch = require("node-fetch");

module.exports = {
name: "catfact",
description: "Shows Up Cat Fact",
run: async(client, message, args) => {

const data = await fetch('https://some-random-api.ml/facts/cat')
    .then(res => res.json())
    .catch(() => null);

    if (!data) return client.embeds.error(message, "Api Currently Down")

  return client.embeds.normal(message, "Cat Fact", data.fact)
}
}
