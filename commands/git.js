const Discord = require("discord.js")
const ayar = require("../config.json")

module.exports.run = async (client, message, args) => {

 if(!message.member.voice.channel) return message.channel.send('Sesli Kanalda Değilsin.');
  
const kisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if(!kisi) return message.channel.send(`${message.author}, Bir kullanıcı etiketlemelisin.`)
const filter = (reaction, user) => {
    return ['✔️', '❌'].includes(reaction.emoji.name) && user.id === kisi.id;
};
message.channel.send(`${kisi}`)
if(!kisi.voice.channel) return message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(message.author.tag , message.author.avatarURL).setDescription('Yanına gitmek istediğin kişi sesli kanalda değil!').setColor('black'))
  message.channel.send(new Discord.MessageEmbed()
  .setAuthor(`${message.author.username}`, message.author.avatarURL({ dymaic: true}))
.setDescription(`<@${kisi.id}>, <@${message.author.id}> Sizin Odanıza Gelme isteği gönderdi.`)
.setColor(client.randomrenk()))
.then(m=>m.react('✔️').then(a=>m.react('❌')).then(s=>
  m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
        const reaction = collected.first()

        if (reaction.emoji.name === '✔️') {
            message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(`${message.author.username}`, message.author.avatarURL({ dymaic: true})).setColor(client.randomrenk()).setDescription('<@'+message.author.id+'> isteğin kabul edildi. '));
            message.member.voice.setChannel(kisi.voice.channel.id)
        } else {
            message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(`${message.author.username}`, message.author.avatarURL({ dymaic: true})).setColor(client.randomrenk()).setDescription('<@'+message.author.id+'> isteğin reddedildi. '))
        }
    })
    ))
};

exports.config = {
  name: "git", 
  guildOnly: true,
  aliases: [],  
};
