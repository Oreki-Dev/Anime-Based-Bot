const fetch = require("node-fetch");

module.exports = {
name: "birdfact",
description: "Shows Up Bird Fact",
run: async(client, message, args) => {

const data = await fetch('https://some-random-api.ml/facts/bird')
    .then(res => res.json())
    .catch(() => null);

    if (!data) return client.embeds.error(message, "Api Currently Down")

  return client.embeds.normal(message, "Bird Fact", data.fact)
}
}
