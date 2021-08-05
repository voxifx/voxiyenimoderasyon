const Discord = require("discord.js")
const ayarlar = require("../config.json")
const ayar = require('../ayarlar.json')
module.exports.run = async (client, message, args) => {
  
if (!message.member.roles.cache.has(ayarlar.kayıtsrm) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author}, **Bu Komutu Kullanmaya Yetkin Yok!**`)
let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
if(!member) return message.channel.send(`${message.author}, Bir kullanıcı etiketlemelisin.`)
message.mentions.members.forEach(async uye => {
if (uye.voice.channel && uye.voice.channel.permissionsFor(message.author).has("MOVE_MEMBERS")) await uye.voice.setChannel(null);
});

let kanal = member.voice.channel.name

let embed = new Discord.MessageEmbed()
.setColor(client.randomrenk())
.setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
.setDescription(`${member} Başarı İle \`${kanal}\` Ses Kanalından Çıkartıldı.`)
.setFooter(ayar.AltBaslık)
message.channel.send(embed)

};

exports.config = {
  name: "kes",  
  guildOnly: true, 
  aliases: ["sesat"], 
};
