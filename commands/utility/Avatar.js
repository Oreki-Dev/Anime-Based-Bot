const { MessageEmbed } = require("discord.js")

module.exports = {
name: "avatar",
aliases: ["av"],
description: "Shows The Avatar Of Yourself Or If Someone Is Mentioned",
usage: "<@User/Id>(Optional)",
run: async(client, message, args) => {
        
const member = client.resolveMember(message, args, true)

        const png = avatar(member, 'png');
        const webp = avatar(member, 'webp');
        const jpg = avatar(member, 'jpg');
        const gif = avatar(member, 'gif');

        const embed = new MessageEmbed()
        .setColor(client.color(message))
        .setTitle(`${member.user.username}'s Avatar`)

        const format = member.user.displayAvatarURL({ dynamic: true }).substr(member.user.displayAvatarURL({ dynamic: true }).length - 3);

        if (!member.user.displayAvatarURL()) {

            return client.embedError(message, 'User Doesn Not Have An Avatar')

        } else if (format == 'gif') {

            embed.setDescription(`[Gif](${gif}) | [Png](${png}) | [Webp](${webp}) | [Jpg](${jpg})`)

            embed.setImage(member.user.displayAvatarURL({ format: 'gif', size: 1024 }))

        } else {

            embed.setDescription(`[Png](${png}) | [Webp](${webp}) | [Jpg](${jpg})`)

            embed.setImage(member.user.displayAvatarURL({ format: 'png', size: 1024 }))

        }

        await message.channel.send({ embed: embed });

    }

}

function avatar(member, format) {

    return member.user.displayAvatarURL({
      dynamic: true,
      size: 1024,
      format,

    });

}