const { inspect } = require('util');
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  ownerOnly: true,
  run: async(client, message, args) => {
    
    const code = args.join(' ');
    if (!code) return client.embeds.error(message, "Dev, Give Something To Evaluate")
    
    let evaled = eval(code);
    
    let output, promise;
    
    if (evaled instanceof Promise) {
      promise = await evaled
        .then(res => { return { resolved: true, body: inspect(res, { depth: 0 })};})
        .catch(err => { return { rejected: true, body: inspect(err, { depth: 0 })};});
    }
    
    if (typeof evaled !== 'string') {
        evaled = inspect(evaled, { depth: 0 });
      };
      
    if (promise) {
        output = client.text.clean(promise.body)
      } else {
        output = client.text.clean(evaled)
      };
      
    const elapsed = Math.abs(Date.now() - message.createdTimestamp);
      const embed = new MessageEmbed()
      .setColor(client.color(message))
      .addField('Input',`\`\`\`js\n${client.text.truncate(client.text.clean(code),1000)}\`\`\``)
      .addField("Output", output.length > 1000
            ? `\`\`\`fix\nExceeded 1000 characters\nCharacter Length: ${output.length}\`\`\``
            : `\`\`\`js\n${output}\n\`\`\``)
      .setFooter(`Evaled in ${elapsed}'ms`)
      
      return message.channel.send(embed)
  }
}