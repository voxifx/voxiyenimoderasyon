const Discord = require("discord.js");
const config = require('../config.json');
module.exports = async client => {
  client.user.setPresence({ activity: { type: "WATCHING", name: `Shâm 🤍 Voxi`}, status: 'online' })
  console.log(`───────────────────────────────────────────── \n ${client.user.username} Bot Başarı İle Başlatıldı! \n ────────────────────────────────────────────── `)
};
