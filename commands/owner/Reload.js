const glob = require("glob")

module.exports = {
name: "reload",
ownerOnly: true,
run: async(client, message, args) => {

        client.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
            if(err) return client.logger.error("reload", err)
            
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)]
                const pull = require(file)
                
                if (pull.name) {
                    console.log(`Reloaded ${pull.name} Command`)
                    client.commands.set(pull.name, pull)
                    }
                
                if (pull.aliases && Array.isArray(pull.aliases)) {
                    
                    pull.aliases.forEach((alias) => {
                        client.aliases.set(alias, pull.name)
                        })
                    }
                })
            })
        client.embeds.success(message, "Reloaded All Commands")
}
}