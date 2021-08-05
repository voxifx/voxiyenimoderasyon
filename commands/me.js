const Discord = require('discord.js');
const client = new Discord.Client();
const ayar = require("../config.json")

exports.run = async (client, message, args) => {
if(!message.member.roles.cache.has(ayar.booster)) return message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(message.author.tag ,message.author.avatarURL).setDescription("Bu Komut Kullanmak İçin Yetkin Yok!"))
  let uye = message.member
  let isim = args.slice(0).join(' ');
  if(!isim) return message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(message.author.tag , message.author.avatarURL).setDescription("Geçerli Bir İsim Girmelisin."))
  
  uye.setNickname(`• ${isim}`)

message.channel.send(`Başarılıyla isminiz  \`• ${isim}\` olarak değiştirildi.`)
// \`${kanal}\`
};

exports.config = {
  name: "b",  
  guildOnly: true, 
  aliases: [], 
};
