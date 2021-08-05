const { MessageEmbed } = require("discord.js");
const ayar = require("../config.json")
const ayarlar = require('../ayarlar.json')
module.exports.run = async (client, message, args) => {
  
  if (!message.member.roles.cache.has(ayar.mute) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author},**Bu Komutu Kullanmaya Yetkin Yok!**`)

let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!uye) return message.channel.send(`${message.author}, Bir kullanıcı etiketlemelisin.`)
 
  let embed = new MessageEmbed()
 .setColor(client.randomrenk())
 .setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
 .setDescription(`${uye} üyesinin, ${message.author} tarafından Mutesi Açıldı!`)
 .setFooter(ayarlar.AltBaslık)
 message.channel.send(embed)
 
uye.roles.remove(ayarlar.muterole);
  
  
};

exports.config = {
  name: "unmute",
  guildOnly: true, 
  aliases: ["umute"], 
};
