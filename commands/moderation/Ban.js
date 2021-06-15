module.exports = {
name: "ban",
aliases: ["banish"],
description: "Bans A Member From The Server",
usage: "<@User/Id>",
botPermission: ["BAN_MEMBERS"],
authorPermission: ["BAN_MEMBERS"],
run: async(client, message, args) => {
        
        let member = client.resolveMember(message, args, false)
        if (!member) return client.embeds.error(message, "Provide A Id Or Mention A User")
        
        let reason = args.slice(1).join(' ')
        
        if (member.id === client.user.id) return client.embeds.error(message, "Why Would You Want To Ban Me?")
        if (member.id === message.author.id) return client.embeds.error(message, "Why Would You Want To Ban Yourself?")
        if (member.roles.highest.position >= message.member.roles.highest.position) return client.embeds.error(message, "Can't Ban Someone Above Your Role Or Equal To Your Role")
        if (member.id === message.guild.ownerID) return client.embeds.error(message, "You Can't Ban Guild Owner")
        if (!member.bannable) return client.embeds.error(message, "Unable To Ban That Member")
        
        await member.ban({ reason: `${reason ? reason : "No Reason Specified"}` })
        client.embeds.success(message, `${member.user.tag} Was Banned From The Server`)
        
}
}