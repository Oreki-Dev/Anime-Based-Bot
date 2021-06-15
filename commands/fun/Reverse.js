module.exports = {
  name: "reverse",
  description: "Reverse The Supplied Text",
  usage: "<Text>",
  run: async(client, message, args) => {
    
    let text = args.join(" ");
    if (!text) return client.embeds.error(message, "What Text Should I Reverse? Baka!")
    
    return client.embeds.normal(message, "Reversed Text", text.split('').reverse().join(' '))
  }
}