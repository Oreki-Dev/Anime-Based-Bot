const fetch = require("node-fetch");

module.exports = {
name: "pandafact",
description: "Shows Up Panda Fact",
run: async(client, message, args) => {

const data = await fetch('https://some-random-api.ml/facts/panda')
    .then(res => res.json())
    .catch(() => null);

    if (!data) return client.embeds.error(message, "Api Currently Down")

  return client.embeds.normal(message, "Panda Fact", data.fact)
}
}
