module.exports = {
 name: "shutdown",
 aliases: ["restart"],
 ownerOnly: true,
 run: async(client, message, args) => {
  await message.react('✅')
  process.exit(1)
 }
}