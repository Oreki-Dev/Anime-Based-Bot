module.exports = {
  name: "unban",
  aliases: ["unbanish"],
  description: "Unban A Banned User",
  usage: "<User-ID>",
  botPermission: ["BAN_MEMBERS"],
  authorPermission: ["BAN_MEMBERS"],
  run: async(client, message, args) => {
    
    let user = args[0]
    if (!user) return client.embeds.error(message, "Baka! Give Id Of The User Banned")
    let reason = args.slice(1).join(" ")
    
    return message.guild.members.unban(user, { reason: reason ? reason : "No Reason Specified" })
    .then(user => client.embeds.success(message, `Successfully Unbanned ${user.tag}!`))
    .catch(() => client.embeds.error(message, `Unable To Unban User With ID ${user}, The Provided Id May Not Be A Valid User Id Or The User May Not Be Banned`));

  }
}