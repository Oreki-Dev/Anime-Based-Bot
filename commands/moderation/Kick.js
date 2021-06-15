module.exports = {
  name: "kick",
  description: "Kicks A User",
  usage: "<@User/User-ID>",
  botPermission: ["KICK_MEMBERS"],
  authorPermission: ["KICK_MEMBERS"],
  run: async(client, message, args) => {
    
    let member = client.resolveMember(message, args, false)
        if (!member) return client.embeds.error(message, "Provide A Id Or Mention A User")
        
        let reason = args.slice(1).join(' ')
        
        if (member.id === client.user.id) return client.embeds.error(message, "Why Would You Want To Kick Me?")
        if (member.id === message.author.id) return client.embeds.error(message, "Why Would You Want To Kick Yourself?")
        if (member.roles.highest.position >= message.member.roles.highest.position) return client.embeds.error(message, "Can't Kick Someone Above Your Role Or Equal To Your Role")
        if (member.id === message.guild.ownerID) return client.embeds.error(message, "Can't Kick Guild Owner")
        if (!member.kickable) return client.embeds.error(message, "Unable To Kick That Member")
        
        await member.kick({ reason: `${reason ? reason : "No Reason Specified"}` })
        client.embeds.success(message, `${member.user.tag} Was Kicked From The Server`)
        
  }
}