const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
name: "help",
aliases: ["h"],
description: "Help Page",
run: async(client, message, args) => {
        
let prefix = await client.db.get(`${message.guild.id}.prefix`)
if (!prefix) prefix = client.config.prefix;

if (!args[0]) {
let categories = [];

      readdirSync("./commands/").forEach((dir) => {
          if (dir.toLowerCase() !== 'owner') {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );
        
        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);
          if (!file.name) return "No command name.";
          let name = file.name.replace(".js", "");
          return `\`${prefix}${name}\``;
        });

        let data = new Object();

        data = {
          name: '<:arrow:853981627683045426> | ' + dir.toUpperCase() + ' | ' + cmds.length,
          value: cmds.length === 0 ? "In progress." : cmds.join(", "),
        };
        categories.push(data);
}
      });
      
      const embed = new MessageEmbed()
        .setTitle(client.user.username)
        .setDescription(`Need More Help? Use ${prefix}help <command> For More Info\nSupport | [Click Me](https://discord.gg/FZaNTZvgWN)`)
        .addFields(categories)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setColor(client.color(message))

      return message.channel.send(embed);
} else {
  
  const command = client.commands.get(args[0].toLowerCase()) || client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
  
  if (!command) return client.embeds.error(message, "No Command With That Name Found")
  
  const embed = new MessageEmbed()
        .setTitle("Command Details")
        .addField("Prefix", `\`${prefix}\``)
        .addField("Command", command.name ? `\`${command.name}\`` : "No Name For This Command")
        .addField("Aliases", command.aliases ? `\`${command.aliases.join("` `, ")}\`` : "```No Aliases For This Command```")
        .addField("Usage", command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\``)
        .addField("Description ", command.description ? `\`\`\`${command.description}\`\`\`` : "```No Description For This Command```")
        .addField("Permission's (Me)", `\`\`\`${command.botPermission ? command.botPermission + ', ' : ''}EMBED_LINKS, SEND_MESSAGES\`\`\``)
        .addField("Permission's (You)", `\`\`\`${command.authorPermission ? command.authorPermission : 'None '}\`\`\``)
        .setTimestamp()
        .setColor(client.color(message));
      return message.channel.send(embed);
}
}
}