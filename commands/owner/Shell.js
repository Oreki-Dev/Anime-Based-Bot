const process = require('child_process');

module.exports = {
name: "shell",
ownerOnly: true,
run: async(client, message, args) => {

let code = args.join(" ")
if (!code) return client.embeds.error(message, "Give Something To Execute")
process.exec(code , (error, stdout) => {
let result = (stdout || error);
client.embeds.normal(message, `${error ? "Error" : "Success"}`, result.substring(0, 1500))
})

}
}