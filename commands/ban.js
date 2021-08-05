const Discord = require("discord.js");
const ayar = require("../config.json")
const db = require("quick.db")
const moment = require("moment")
const ayarlar = require('../ayarlar.json')
module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.get(ayarlar.banyetkilisi) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author}, **Bu Komutu Kullanmaya Yetkin Yok!**`)
const delay = (msec) => new Promise((resolve) => setTimeout(resolve, msec));
    
let reason = args.splice(1).join(" ") || "Sebep Belirtilmedi";
if(!reason) return message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Geçerli Bir Sebep Girmelsin!"))
  db.add('id',1)
  let banid = db.fetch('id')
  
   const userembed = new Discord.MessageEmbed()
    .setAuthor(ayarlar.üsetbaslık)
     .setColor("RANDOM")
    .setDescription(`
**${ayarlar.Sunucuismi}** adlı sunucudan ${message.author} tarafından "${reason}" sebebiyle yasaklandınız.
    `)
   .setImage('https://cdn.discordapp.com/attachments/787344673584709643/844120273019600896/bangif4.gif')

   
  
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!user) return message.channel.send(`${message.author}, Bir kullanıcı etiketlemelisin.`)
    
    user.send(userembed)  
   await delay(200);
    
  if(message.author.id === user.user.id) return message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Kendinden Üsteki Yetkiliyi Banlıyamaz.")).then(msg => msg.delete(9000))
    if(message.author.id === user.user.id) return message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription("Kendini Banlıyamazsın.")).then(msg => msg.delete(9000))
  

    
    

  
    user.ban()
    
    const voxi = new Discord.MessageEmbed()
    .setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
    .setColor("RANDOM")
    .setDescription(`
\`•\` Ceza ID: (\`#${banid-(-1)}\`)
\`•\` Yasaklanan Üye: ${user.user} (\`${user.id}\`)
\`•\` Yasaklayan Yetkili: ${message.author} (\`${message.author.id}\`)
\`•\` Yasaklanma Sebebi: \ [\`${reason}\`]

                          `)
    .setFooter(ayarlar.AltBaslık)

      client.channels.cache.get(ayarlar.banlog).send(voxi)  
    
    
   
};

exports.config = {
  name: "ban",  
  guildOnly: true, 
  aliases: ["banned","totika","ali","melina","sıla","arda"], 
};
