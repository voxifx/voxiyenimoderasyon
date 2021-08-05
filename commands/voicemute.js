const Discord = require("discord.js");
const ms = require('ms')
const data = require('quick.db')
const moment = require('moment')
const ayarlar = require('../config.json')

module.exports.run = async (client, message, args) => {
  moment.locale('tr')
const ayar = require('../ayarlar.json')


    if (!message.member.roles.cache.has(ayar.sesmuteyetkilisi) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author}, **Bu Komutu Kullanmaya Yetkin Yok!**`)

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!user) return message.channel.send(` ${message.author}, Bir kullanıcı etiketlemelisin.`)


//if(!user.voiceChannel) return message.channel.send(`Kullanıcı ses kanalında bulunmadığı için susturamam.`)

if(user.serverMute === true) return message.channel.send(`Kullanıcı zaten susturulduğu için tekrar susturamam.`)

let time = args[1]
if(!time || !ms(time)) return message.channel.send(`Lütfen, geçerli bir süre belirtin.`)

if(ms(time) > 2592000000) return message.channel.send(`Bir kullanıcıyı en fazla 30 gün susturabilirsiniz.`)

let reason = args.slice(2).join(' ') || "Sebep Belirtilmemiş."

let açılma_zamanı = Date.now() + ms(time)

let muteid = await data.fetch('id')

  let voxitimee = moment(Date.now()).format('Do MMMM YYYY - HH:mm:ss')
  
message.channel.send(`
**${user.user}** Adlı Kullanıcı Ses Kanallarından Uzaklaştırıldı. (\`#${muteid-(-1)}\`)
 `)

data.add('id',1)
const mutelog = new Discord.WebhookClient(ayarlar.mutelogid, ayarlar.mutelogtoken)




 const voxi = new Discord.MessageEmbed()
    .setAuthor(message.author.username , message.author.avatarURL({ dyamic: true}))
    .setColor("RANDOM")
    .setDescription(`
\`•\` Ceza ID: (\`#${muteid-(-1)}\`)
\`•\` Ses Mutelenen Üye: ${user.user}  (\`${user.id}\`)
\`•\` Ses Muteleyen Yetkili: ${message.author}  (\`${message.author.id}\`)
\`•\` Ses Mute Tarihi: \`${voxitimee}\` 
\`•\` Ses Mute Bitiş Tarihi: \`${moment(açılma_zamanı).format('Do MMMM YYYY - HH:mm:ss')}\`
\`•\` Ses Mute Sebebi: \ [\`${reason}\`]
                                                                                       `)
    .setFooter(ayar.AltBaslık)

      client.channels.cache.get(ayar.sesmutelog).send(voxi)  
user.voice.setMute(true);

setTimeout(() => {
if(user.serverMute === false) return 

user.voice.setMute(false);

let embed2 = new Discord.MessageEmbed()
.setColor(client.randomrenk())
.setAuthor(message.author.username , message.author.avatarURL({ dymaic: true}))
.setDescription(`**${user.user}**Adlı Kullanıcı ses kanallarından cezası Kaldırıldı. (\`#${muteid-(-1)}\`)

\`•\` **Açılma Zamanı:** ${moment(açılma_zamanı).format('Do MMMM YYYY - HH:mm:ss')}
\`•\` **Atılış Sebepi:** ${reason}

`)
   client.channels.cache.get(ayar.sesmutelog).send(embed2)  
}, ms(time));

};

exports.config = {
  name: "vmute",  
  guildOnly: true, 
  aliases: ["sesmute","voicemute"], 
};
