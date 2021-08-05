const discord = require('discord.js')
const ayarlar = require('../config.json')


module.exports.run = async (client, message, args) => {


if (!message.member.roles.cache.has(ayarlar.booster) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author}, **Bu Komutu Kullanmaya Yetkin Yok!**`)

let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0])
let author = message.author
let nick = args[1]

if(!nick) return message.channel.send('Bir isim belirtmelisin!')

await uye.setNickname(`• ${nick}`).catch();


};
exports.config = {
    name: "bisim",  
    guildOnly: true, 
    aliases: [],  
  };
