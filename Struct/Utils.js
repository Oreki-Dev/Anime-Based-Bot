const { readdirSync } = require("fs");
const ascii = require("ascii-table");

module.exports = class Utils {
  constructor(client) {
    this.client = client;
  }
  
  isUrl(str) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if(regexp.test(str)) {
    return true;
  } else {
    return false;
  }
  }
  
  async loadCommands() {
    let table = new ascii("Commands");
    table.setHeading("Command", "Load status");
    
    readdirSync("./commands/").forEach(dir => {
  
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
   
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                this.client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => this.client.aliases.set(alias, pull.name));
        }
    });
    console.log(table.toString())

  }
  
  async loadEvents() {
    let table = new ascii("Events");
    table.setHeading("Event", "Load status");
    
    const commands = readdirSync(`./events/`).filter(file => file.endsWith(".js"));

  for (let file of commands) {

    try {
    let pull = require(`../events/${file}`);

    if (pull.event && typeof pull.event !== "string") {
      table.addRow(file, `❌ -> Property event should be string.`);
      continue;
    }

    pull.event = pull.event || file.replace(".js", "")

    this.client.on(pull.event, pull.run.bind(null, this.client))

    table.addRow(file, '✅');

    } catch(err) {

  console.log("Error While loading/executing command")
  console.log(err)
  table.addRow(file, `❌ -> Error while loading event`);
    }
  }

   console.log(table.toString());
  }
}