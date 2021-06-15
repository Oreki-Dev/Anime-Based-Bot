const ms = require('ms');

module.exports = {
    name: "slowmode",
    aliases: ["sm"],
    description: "Put Up Slowmode In The Channel",
    usage: "<Time>",
    authorPermission: ["MANAGE_CHANNELS"],
    botPermission: ["MANAGE_CHANNELS"],
    run: async(client, message, args) => {
        
        if(args[0] == "off") {
            message.channel.setRateLimitPerUser(0);
            return client.embeds.success(message, "Slowmode Disabled")
        }
        
        if(!args[0]) return client.embeds.error(message, "slowmode <time/off> <s/m/h>");
        
        const raw = args[0];
        const milliseconds = ms(raw);

        if(isNaN(milliseconds)) return client.embeds.error(message, "That Isn't Valid Time")

        if(milliseconds < 1000) return client.embeds.error(message, "You Can't Set Slowmode Of Below 1 Sec")

        if(milliseconds > 21600000) return client.embeds.error(message, "You Can't Set Slowmode Of Above 6 Hours")

        message.channel.setRateLimitPerUser(milliseconds / 1000);
        return client.embeds.error(message, `Slowmode Set - ${ms(milliseconds, {
            long: true
        })}`)
    }
}