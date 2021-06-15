const { Calculator } = require("weky");

module.exports = {
  name: "calculator",
  aliases: ["calc"],
  description: "Opens Up Calculator",
  run: async(client, message, args) => {
    return await Calculator(message)
  }
}