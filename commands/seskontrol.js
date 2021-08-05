const Discord = require("discord.js")


  module.exports.run = async (client, message, args) => {
    
      let author = message.author
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
        const buğraoç2 = new Discord.MessageEmbed()
    .setDescription(`Belirttiğin kişi ses kanalında bulunmuyor.`)
    .setColor("#36393e")
    
    
        const buğraoc = new Discord.MessageEmbed()
    .setDescription(`\`•\` ${uye} kişisi **${uye.voice.channel}** kanalında.
\`•\` Mikrofon Durumu: ${uye.voice.selfMute ?  "\`Mikrofonu Kapalı\`" : "\`Mikrofunu Açık\`"}
\`•\` Kulaklık Durumu: ${uye.voice.selfDeaf ? "\`Kulaklığı Kapalı\`" : "\`Kulaklığı Açık\`"}
`)
.setColor("#36393e")
    

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send()
  if (!uye) return message.channel.send(`${message.author}, Bir kullanıcı etiketlemelisin.`);
  
  if (!uye.voice.channel) {
  message.channel.send(buğraoç2).then(m => m.delete({ timeout: 7000 }));
  } else { 
    message.channel.send(buğraoc)
    
   
  };
};

exports.config = {
  name: "seskontrol",  
  guildOnly: true, 
  aliases: ["n"], 
};
