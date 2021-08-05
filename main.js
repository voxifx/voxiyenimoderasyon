const Discord = require("discord.js")
const client = new Discord.Client();
const config = require("./config.json")
const moment = require('moment')
const db = require('quick.db')
require("moment-duration-format")
  moment.locale("tr")
const fs = require("fs");                                       
require('./util/Loader.js')(client);
const ayarlar = require('./ayarlar.json')
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`)
    console.log(`Events Klasörü Yüklendi`)
    console.log(`${props.config.name} Komut Yüklendi | Durum: ✅`)
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });                                                                     
});



  const ms = require("parse-ms");
  client.on("message", async message => {
    
    if(message.author.bot) return;
    if(!message.guild) return;
    if(message.content.includes(`${config.prefix}afk`)) return;
    
    if(await db.fetch(`afk_${message.author.id}`)) {
      db.delete(`afk_${message.author.id}`);
      db.delete(`afk_süre_${message.author.id}`);
      message.channel.send(new Discord.MessageEmbed().setColor(client.randomrenk()).setAuthor(message.author.username , message.author.avatarURL({ dyamic: true})).setDescription(`Afk Modundan Çıktı!`))       
   const buseafk = message.member.displayName.replace("[AFK]","")
  message.member.setNickname(buseafk)
    }
    
    var USER = message.mentions.users.first();
    if(!USER) return;
    var REASON = await db.fetch(`afk_${USER.id}`);
    
    if(REASON) {
      let süre = await db.fetch(`afk_süre_${USER.id}`);
      let timeObj = ms(Date.now() - süre);
      //`${USER.tag} kullanıcısı AFK\n AFK süresi: ${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s\nSebep:\n **${REASON}**`
      let emb = new Discord.MessageEmbed()
      .setColor(client.randomrenk())
      .setAuthor(message.author.username , message.author.avatarURL({ dynamic: true}))
      .setDescription(`${USER} üyesi, Şuanda \`${timeObj.hours} Saat ${timeObj.minutes} Dk ${timeObj.seconds} Saniye\` Afk Modunda \n Sebep: ${REASON}`)
  message.channel.send(emb)
    }
  });






let botVoiceChannel = client.channels.cache.get(config.botVoiceChannelID);
if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));

client.on("userUpdate", async (oldUser, newUser) => {
    if (oldUser.username !== newUser.username) {
      let tag = "Séi"; 
      let sunucu = "867403193784729621"; 
      let kanal = "870540423951687710" 
      let rol = "870531102543073301"; // rol ID
      if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
        client.channels.cache.get(kanal).send(`${newUser} isimli kullanıcı kullanıcı adına tagımızı eklediği için rol ve ayrıcalıkları verilmiştir.`)
	newUser.send('Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.')
        client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol)
      } if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
        client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol)
        client.channels.cache.get(kanal).send(`${newUser} isimli kullanıcı kullanıcı adından tagı çıkardığı için ayrıcılıkları alınmıştır.`)
	newUser.send('#0095 Tagını Bırakıp Aramızdan Ayrılmanın Nedenini Anlamış Değiliz Fakat Tekrar Aramıza Katılmak İstersen')
	newUser.send('#0095 Tag: **Séi**')
      }
 
    }
  })

client.randomrenk = function () {
  let renkler = ["#68228b","#cd661d","#00ffff"]
  return renkler[Math.floor(Math.random() * renkler.length)]
 };

client.on('message', async message => {
  if(message.author.bot || message.channel.type === "dm") return;
           if(message.content.includes('!tag')){
             [message.channel.send(config.tag)] 
      }
})

client.on('guildMemberAdd' , async member => {
  let j = await db.fetch(`jail_${member.guild.id}_${member.id}`)
  if(j === 'var') {
      member.addRole(config.cezalırol)
      member.removeRole(config.kayitsizRolu)	
      const jaillogs = new Discord.WebhookClient(config.jaillogid, config.jaillogtoken)

  let kanal = client.channels.cache.get(config.jaillog) 
    let emb = new Discord.MessageEmbed()
  .setColor(client.randomrenk())
  .setTitle('• Cezalı')
  .setDescription(`**${member} Adlı Kullanıcı \`Cezalı\`lıda Kayıtlı Olduğu İçin Sizi Tekrardan Cezalıya Attım! `)
client.channels.cache.get(jaillogs).send(emb)

member.send(`${member} sunucumuza hoşgeldiniz sen onceden jailde oldugun için seni yeniden jaile atmak zorunda kaldım.`)
}
})

client.on("guildMemberAdd", async member => {
	let muteData = db.get(`${member.guild.id}.${member.id}.mute`)
	let log_channel = member.guild.channels.cache.find(x => x.name === "mute-log");
  const mutelogs = new Discord.WebhookClient(config.mutelogid, config.mutelogtoken)

	if(muteData) {
		member.addRole(config.muterol) //Muted ID
		mutelogs.send(new Discord.RichEmbed().setColor(client.randomrenk()).setTitle('Susturulma Bildirimi').setDescription(`**${member.user.tag}** isimli kullanıcı, susturma cezasını kaldırmak amaçlı sunucuda çık gir yaptı!\n \n\`\`\`Susturulma Sebebi: ${muteData}\`\`\``).setFooter(member.guild.name, member.guild.iconURL).setTimestamp())
	}
})


client.login(ayarlar.token)


client.on('voiceStateUpdate', async (oldState, newState) => {
	 
  let log = newState.guild.channels.cache.get('869954762496434187')
  let user = newState.guild.members.cache.get(newState.id)

  if(oldState.voiceChannelID && newState.voiceChannelID && oldState.voiceChannelID != newState.voiceChannelID) return log.send(`**${user.displayName}** adlı üye, **\`${newState.guild.channels.get(oldState.voiceChannelID).name}\`** adlı ses kanalından **\`${newState.guild.channels.get(newState.voiceChannelID).name}\`** ses kanalına geçti`);
  if(!oldState.voiceChannelID && newState.voiceChannelID) return log.send(`**${user.displayName}** adlı üye, **\`${newState.guild.channels.get(newState.voiceChannelID).name}\`** adlı ses kanalına giriş yaptı!`);
  if(oldState.voiceChannelID && !newState.voiceChannelID) return log.send(`**${user.displayName}** adlı üye, **\`${newState.guild.channels.get(oldState.voiceChannelID).name}\`** adlı ses kanalından çıkış yaptı!`);
  if(oldState.voiceChannelID && !oldState.selfDeaf && newState.selfDeaf) return log.send(`**${user.displayName}** adlı üye, **\`${newState.guild.channels.get(newState.voiceChannelID).name}\`** adlı ses kanalında kendini sağırlaştırdı!`);
  if(oldState.voiceChannelID && oldState.selfDeaf && !newState.selfDeaf) return log.send(`**${user.displayName}** adlı üye, **\`${newState.guild.channels.get(newState.voiceChannelID).name}\`** adlı ses kanalında kendi sağırlaştırmasını kaldırdı!`);
  if(oldState.voiceChannelID && !oldState.selfMute && newState.selfMute) return log.send(`**${user.displayName}** adlı üye, **\`${newState.guild.channels.get(newState.voiceChannelID).name}\`** adlı ses kanalında kendini susturdu!`);
  if(oldState.voiceChannelID && oldState.selfMute && !newState.selfMute) return log.send(`**${user.displayName}** adlı üye, **\`${newState.guild.channels.get(newState.voiceChannelID).name}\`** adlı ses kanalında kendi susturmasını kaldırdı!`);
  if(oldState.voiceChannelID && !oldState.selfStream && newState.selfStream) return log.send(`**${user.displayName}** adlı üye, **\`${newState.guild.channels.get(newState.voiceChannelID).name}\`** adlı ses kanalında yayın açtı!`);
  if(oldState.voiceChannelID && oldState.selfStream && !newState.selfStream) return log.send(`**${user.displayName}** adlı üye, **\`${newState.guild.channels.get(newState.voiceChannelID).name}\`** adlı ses kanalında yayını kapattı!`);
 });

client.on("ready", () => {
  const channel = client.channels.cache.get("872508039146659860");
  if (!channel) return console.error("The channel does not exist!");
  channel.join().then(connection => {
    // Yay, it worked!
    console.log("Successfully connected.");
  }).catch(e => {
    // Oh no, it errored! Let's log it to console :)
    console.error(e);
  });
});


