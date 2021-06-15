const { MessageEmbed } = require("discord.js");
const Fetch = require("node-fetch");
module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends A Meme!",
    run: async (client, message, args) => {
        const Reds = [
            "memes",
            "me_irl",
            "dankmemes",
            "comedyheaven",
        ];

        const Rads = Reds[Math.floor(Math.random() * Reds.length)];

        const res = await Fetch(`https://www.reddit.com/r/${Rads}/random/.json`);

        const json = await res.json();

        if (!json[0]) return client.embeds.error(message, `An Error Occurred While Looking For A Meme`);

        const data = json[0].data.children[0].data;

        const embed = new MessageEmbed()
            .setColor(client.color(message))
            .setURL(`https://reddit.com${data.permalink}`)
            .setTitle(data.title)
            .setImage(data.url)
            .setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
            .setTimestamp();

        return message.channel.send(embed);

    }
};