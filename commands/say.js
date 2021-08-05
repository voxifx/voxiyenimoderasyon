const Discord = require("discord.js");
const ayarlar = require("../config.json");
const moment = require("moment");   
const ayar = require('../ayarlar.json')
module.exports.run = async (client, message, args) => {

if (!message.member.roles.cache.has(ayarlar.say) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author}, **Bu Komutu Kullanmaya Yetkin Yok!**`)
  
moment.locale('tr')
var voxi = moment().format('hh:mm');
 
let kisi = message.guild.memberCount
let tag = ayar.tag
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === "voice");
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
 var etiket = message.guild.members.cache.filter(aris => !aris.bot).filter(member => member.user.discriminator == ayar.etiket).size
  var toplam = message.guild.members.cache.filter(aris => !aris.bot).filter(member => member.user.username.includes(tag) || member.user.discriminator == ayar.etiket).size
  
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
    .setColor(client.randomrenk())

 .setDescription(`\`❯\` Toplam Sunucuda **${message.guild.memberCount}** Kişi Bulunmaktadır.
\`❯\` Sunucuda Aktif **${message.guild.members.cache.filter(m => !m.user.bot && m.user.presence.status !== "offline").size}** Kişi Bulunmaktadır. 
\`❯\` Ses Kanallarında **${count}** Kişi Bulunmaktadır. 
\`❯\` Toplamda **${toplam}** kişi tagımızı alarak bizi desteklemiş, Etiket: ${etiket}.`)
  



  message.channel.send(embed);
};

exports.config = {
  name: "say",  
  guildOnly: true, 
  aliases: [], 
};
