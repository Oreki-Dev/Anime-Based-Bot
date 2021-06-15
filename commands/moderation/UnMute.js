module.exports = {
name: "unmute",
description: "Unmute A Mutet Member",
usage: "<@User/Id>",
botPermission: ["MANAGE_ROLES"],
authorPermission: ["MANAGE_ROLES"],
run: async(client, message, args) => {

        let muterole = await client.db.get(`${message.guild.id}.muteRole`)
        if (!muterole) return client.embeds.error(message, "Mute Role Is Not Set, Set It Up First Using muterole Command")
        
        let member = client.resolveMember(message, args, false)
        if (!member) return client.embeds.error(message, "Mention A Member Or Provide An Id Of The Member")
        
        
        if (member.user.id === message.guild.ownerID) return client.embeds.error(message, "Guild Owner's Can't Be Muted Or Unmuted")
         if (member.roles.highest.position >= message.member.roles.highest.position) return client.embeds.error(message, "Can't UnMute Someone Above Your Role Or Equal To Your Role")
        
        let role = message.guild.roles.cache.get(muterole)
        if (!role) return client.embeds.error(message, "Couldn't Find Mute Role")
        if (role.position > message.guild.me.roles.highest.position) return client.embeds.error(message, "Can't Access That Role")
        
        if (!member.roles.cache.has(muterole)) return client.embeds.error(message, "That User Is Not Muted")
        
        try {
            await member.roles.remove(role)
                           client.embeds.success(message, "UnMuted That Member")
            } catch (e) {
                return client.embeds.error(message, "Couldn't UnMute That Member")
                
 
                }
}
}