const { MessageEmbed } = require("discord.js");
const weather = require("weather-js");

module.exports = {
 name: "weather" ,
 description: "Look Up For Weather",
 usage: "<City>",
 run: async (client, message, args) => {
  let city = args.join(" ");
  let degreetype = "C";

  await weather.find({search: city, degreeType: degreetype}, function(err, result) {
    if (!city) return client.embeds.error(message, "Which City Should I Search Weather Of?");
    if (err || result === undefined || result.length === 0) return client.embeds.error(message, "Error Occurred")

    let current = result[0].current;
    let location = result[0].location;

    const embed = new MessageEmbed()
      .setAuthor(current.observationpoint)
      .setDescription(`> ${current.skytext}`)
      .setThumbnail(current.imageUrl)
      .setTimestamp()
      .setColor(client.color(message))
      .addField("Latitude", location.lat, true)
      .addField("Longitude", location.long, true)
      .addField("Feels Like", `${current.feelslike}° Degrees`, true)
      .addField("Degree Type", location.degreetype, true)
      .addField("Winds", current.winddisplay, true)
      .addField("Humidity", `${current.humidity}%`, true)
      .addField("Timezone", `GMT ${location.timezone}`, true)
      .addField("Temperature", `${current.temperature}° Degrees`)
      .addField("Observation Time", current.observationtime, true)

      return message.channel.send(embed);
  })
 }
}