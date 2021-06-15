const { WouldYouRather } = require('weky');

module.exports = {
    name: 'wouldyourather',
    aliases: ['wyr'],
    description: "Send some would-you rather questions",
    run: async(client, message, args) => {
    await WouldYouRather(message)
    }
}