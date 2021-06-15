module.exports = {
name: "mute",
description: "Mute A Member",
usage: "<@User/Id>",
botPermission: ["MANAGE_ROLES"],
authorPermission: ["MANAGE_ROLES"],
run: async(client, message, args) => {

        let muterole = await client.db.get(`${message.guild.id}.muteRole`)
        if (!muterole) return client.embeds.error(message, "Mute Role Is Not Set, Set It Up First Using muterole Command")
        
        let member = client.resolveMember(message, args, false)
        if (!member) return client.embeds.error(message, "Mention A Member Or Provide An Id Of The Member")
        
        if (member.user.id === message.member.id) return client.embeds.error(message, "Why Would You Want To Mute Yourself?")
        if (member.user.id === client.user.id) return client.embeds.error(message, "Why Would You Want To Mute Me?")
        if (member.user.id === message.guild.ownerID) return client.embeds.error(message, "You Can't Mute Guild Owner")
         if (member.roles.highest.position >= message.member.roles.highest.position) return client.embeds.error(message, "Can't Mute Someone Above Your Role Or Equal To Your Role")
        
        let role = message.guild.roles.cache.get(muterole);
        
        if (!role) return client.embeds.error(message, "Couldn't Find Mute Role")
        if (role.position > message.guild.me.roles.highest.position) return client.embeds.error(message, "Can't Access That Role")
        
         if (member.roles.cache.has(muterole)) return client.embeds.error(message, "That User Is Already Muted")
        
        try {
            await member.roles.add(role)
                           client.embeds.success(message, "Muted That Member")
            } catch (e) {
                return client.embeds.error(message, "Couldn't Mute That Member")
                
 
                }
}
}