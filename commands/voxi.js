const discord = require('discord.js')
const dbs = require('../ss/Voxi.js')

module.exports.run = async (client, message, args) => {
  
  

message.channel.send(dbs.bul('Voxi'))
  };

exports.config = {
    name: "ssss",  
    guildOnly: true, 
    aliases: [], 
  };
