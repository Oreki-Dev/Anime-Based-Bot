const { Client, version, Collection } = require('discord.js');
const fetch = require("node-fetch");
const { performance } = require('perf_hooks');
const Utils = require("./Utils.js");
const Anilist = require("./Anilist.js");
const Embeds = require("./Embeds.js");
const Logger = require("./Logger.js");
const Images = require("./Images");
const Text = require("./Text.js");
const { Database } = require("quickmongo");

module.exports = class client extends Client {
  constructor() {
    super({
     disableMentions: 'everyone'
    });
    
    this.commands = new Collection();
    this.aliases = new Collection();
    this.utils = new Utils(this);
    this.anilist = new Anilist(this);
    this.embeds = new Embeds(this);
    this.logger = new Logger(this);
    this.images = new Images(this);
    this.text = new Text(this);
    this.config = require("../Assets/config");
    this.db = new Database(this.config.mongo);
    
    this.snipes = new Collection();
    this.esnipes = new Collection();
    
    this.bootTime = null;
    
    require('discord-buttons')(this);
    
    this.once('ready', () => {
     return this.bootTime = Math.round(performance.now());
    });
    
    this.on('message', async(message) => {
      
      if (!message.guild || message.author.bot) return; 
      
      let prefix = await this.db.get(`${message.guild.id}.prefix`);
      if (!prefix) prefix = this.config.prefix;
      
      if (message.content.startsWith(prefix)) return;
      
      try {
        
        let chatbotchannel = await this.db.get(`${message.guild.id}.chatbot`)
        if (!chatbotchannel) return;
        
        let channel = this.channels.cache.get(chatbotchannel)
        if (!channel) return;
        
        if (message.channel.id === chatbotchannel) {
    
   let res = await fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${message.content}&botname=${this.user.username}&ownername=!Drago&user=${message.author.id}`)
    if (!res) return;
    res = await res.json()
                
    let reply = res.message;
               
    this.embeds.normal(message, `Replying To ${message.author.tag}`, `${reply}`)
    }
      } catch (e) {
        return this.logger.error("Chatbot", `${e}`)
      }
    })
    
  }
  
  async start() {
    this.utils.loadCommands();
    this.utils.loadEvents();
    super.login(this.config.token)
  }
  
  version() {
    let Dversion = version;
    let Cversion = require("../package.json").version
    
    return { Dversion: Dversion, Cversion: Cversion }
  }
  
  color(message) {
    let color = message.guild.me.roles.highest.hexColor;
    if (!color || color === '#000000') color = '#9B30FF'
    
    return color;
  }
  
  resolveMember(message, args, allowAuthor) {
    let member;

    member = message.guild.member(
      message.mentions.users.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find((m) => m.user.id === args[0]) ||
        message.guild.members.cache.find((m) => m.user.tag === args[0]) ||
        message.guild.members.cache.find((m) => m.user.username === args[0])
    );

    if (!member && allowAuthor) {
      member = message.member;
    }
    return member;
  }
  
  resolveChannel(message, args) {
    let channel;
    
    channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    
    if (!channel) channel = null;
    
    return channel;
  }
}
