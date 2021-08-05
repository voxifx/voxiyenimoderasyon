const { MessageEmbed } = require("discord.js");
const ayar = require("../config.json")
module.exports.run = async (client, message, args) => {
  if(!message.member.roles.cache.get(ayar.ban) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${message.author}, **Bu Komutu Kullanmaya Yetkin Yok!**`)

  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(client.randomrenk()).setTimestamp();
  if (!args[0] || isNaN(args[0])) return message.channel.send(`${message.author}, Bir kullanıcı etiketlemelisin.`).then(x => x.delete({timeout: 5000}));
  let kisi = await client.users.fetch(args[0]);
  if(kisi) {
    let reason = args.splice(1).join(" ") || "sebep belirtilmedi";
    message.guild.members.unban(kisi.id)
                                                                                   
message.channel.send(`Başarılı bir şekilde ${kisi.tag} adlı kişinin banını kaldırdım.`)

  };
};
exports.config = {
  name: "unban",  
  guildOnly: true, 
  aliases: [], 
};
