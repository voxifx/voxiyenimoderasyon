const { MessageEmbed } = require("discord.js");
const ayar = require("../config.json")

module.exports.run = async (client, message, args) => {
  
  if (!message.member.roles.cache.has(ayar.jail) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author}, **Bu Komutu Kullanmaya Yetkin Yok!**`)

let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!uye) return message.channel.send(`<${message.author}, Bir kullanıcı etiketlemelisin.`)


 
  let embed = new MessageEmbed()
 .setColor(client.randomrenk())
 .setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
 .setDescription(`${uye} üyesinin, ${message.author} tarafından jaili kaldırıldı!`)
 message.channel.send(embed)
 
 
message.guild.members.cache.get(uye.id).roles.cache.forEach(r => {
message.guild.members.cache.get(uye.id).roles.remove(r) 
uye.roles.add(ayar.voxikayıtsız);
  })
  
};

exports.config = {
  name: "unjail",
  guildOnly: true, 
  aliases: ["ujail"], 
};
