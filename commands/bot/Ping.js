module.exports = {
  name: "ping",
  aliases: ["latency"],
  description: "Shows Bot's Latency",
  run: async(client, message, args) => {
    return client.embeds.normal(message, "Latency", `${client.ws.ping}'ms`)
  }
}