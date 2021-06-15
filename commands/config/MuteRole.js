module.exports = {
name: "muterole",
authorPermission: ["MANAGE_ROLES"],
run: async(client, message, args) => {

        let prefix = await client.db.get(`${message.guild.id}.prefix`)
        if (!prefix) prefix = client.config.prefix;
        
        let muteRole = await client.db.get(`${message.guild.id}.muteRole`)
        
        if (!args[0]) return client.embeds.normal(message, "Mute Role Command", `Mute Role : ${muteRole ? message.guild.roles.cache.get(muteRole).name : "Not Set"}\n\nTo Set The Mute Role Use Command\n${prefix}muterole set <role>\nTo Create A Mute Role Use Command\n${prefix}muterole create\nTo Remove The Mute Role From The Database Use Command\n${prefix}muterole delete`)
            
            if (args[0].toLowerCase() === 'set') {
                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
                if (!role) return client.embeds.error(message, "Mention A Role Or Provide ID To Be Set As Muted Role")
                
                if (muteRole && muteRole === role.id) return client.embeds.error(message, "That Role Is Already Set As Muted Role")
                
                if (role.position >= message.guild.me.roles.highest.position) return client.embeds.error(message, "That Role Is Above My Highest Role")
                
                await client.db.set(`${message.guild.id}.muteRole`, role.id)
                client.embeds.success(message, `Mute Role Set As ${role.name}`)
                }
        
        if (args[0].toLowerCase() === 'create') {
            
    if (muteRole || message.guild.roles.cache.find(r => r.name === 'Muted')) return client.embeds.error(message, "Muted Role Is Already Created")
            
            try {
                message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: "#514f48",
                        permissions: []
                        }
                    }).then(async(muterole) => {
                
                message.guild.channels.cache.forEach(async (channel) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false,
                        CONNECT: false,
                        })
                    })
                
                await client.db.set(`${message.guild.id}.muteRole`, muterole.id)
                client.embeds.success(message, "Created Mute Role With Name Muted")
                    })
                } catch (e) {
                    client.embeds.error(message, "Couldn't Create The Muterole, Missing Permissions")
                    }
            }
        
        if (args[0].toLowerCase() === 'delete') {
            if (!muteRole) return client.embeds.error(message, "There Is No Muted Role Set")
            
            await client.db.delete(`${message.guild.id}.muteRole`)
            client.embeds.success(message, "Mute Role Removed From The Database")
            }
        
}
}