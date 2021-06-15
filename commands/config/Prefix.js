module.exports = {
name: "prefix",
description: "Changes The Bot's Prefix",
usage: "<New Prefix>",
authorPermission: ["ADMINISTRATOR"],
run: async(client, message, args) => {

let prefix = await client.db.get(`${message.guild.id}.prefix`)
if (!prefix) prefix = client.config.prefix;

if (!args[0]) {

return client.embeds.normal(message, "Prefix For This Guild", prefix)

}
    
if (args[0]) {
 
await client.db.set(`${message.guild.id}.prefix`, args[0])
client.embeds.success(message, `New Prefix Is Now ${args[0]}`)
    
    }
        
}
}