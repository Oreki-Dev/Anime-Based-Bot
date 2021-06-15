const fetch = require("node-fetch");

module.exports = {
name: "koalafact",
description: "Shows Up Koala Fact",
run: async(client, message, args) => {

const data = await fetch('https://some-random-api.ml/facts/koala')
    .then(res => res.json())
    .catch(() => null);

    if (!data) return client.embeds.error(message, "Api Currently Down")

  return client.embeds.normal(message, "Koala Fact", data.fact)
}
}
