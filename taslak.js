const db = require("quick.db")
const Discord = require("discord.js")
exports.run = function(client, message, args) {

  var USER = message.author;
  var REASON = args.slice(0).join("  ");
  if(!REASON) return message.channel.send("AFK olmak için bir sebep belirtin.");
  
  db.set(`afk_${USER.id}`, REASON);
  db.set(`afk_süre_${USER.id}`, Date.now());
  message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(e => message.channel.send("Bot üstü olduğun için birşey yapamıyorum .("))
  message.channel.send("Başarıyla İle Afk Moduna Geçildi!")
  
  
};

exports.config = {
  name: "ssss",
  guildOnly: true, 
  aliases: [""], 
};