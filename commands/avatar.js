  
const { MessageEmbed } = require("discord.js");

module.exports.execute = (client, message, args, ayar, emoji) => {
	let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
	let avatar = victim.avatarURL({ dynamic: true, size: 2048 });
  let embed = new MessageEmbed()
	.setColor(client.randomColor())
  .setAuthor(victim.tag, avatar)
  .setFooter(`${message.member.displayName} tarafından istendi!`, message.author.avatarURL({ dynamic: true }))
	.setDescription(`[Resim Adresi](${avatar})`)
	.setImage(avatar)
	message.channel.send(embed);
};
exports.config = {
  name: "avatar",  
  guildOnly: true, 
  aliases: ["pp"], 
};