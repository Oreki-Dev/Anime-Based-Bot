const fetch = require("node-fetch");
const Badwords = require('bad-words');
const badWords = new Badwords();

module.exports = {
  name: "8ball",
  description: "Answers Your Query",
  usage: "<Argument>",
  run: async(client, message, args) => {

    const text = args.join("%20");
    if (!text) return client.embeds.error(message, "Baka! Whats Your Question?")
    
    if (badWords.isProfane(message.content)) return client.embeds.error(message, "Baka! I Don't Reply To Useless Questions")
    
    let answer = await fetch(`https://nekos.life/api/v2/8ball?text=${text}`);
    let Response = await answer.json();
    if (!answer || !Response) return client.embeds.error(message, "Error Occurred While Answering")
    
    return client.embeds.normal(message, "Answer", `${Response.response}`)
    
    message.channel.send(ballembed)
  }
}