const Discord = require("discord.js");
const config = require('../config.json');
module.exports = async client => {
  client.user.setPresence({ activity: { type: "WATCHING", name: `ShΓ’m π€ Voxi`}, status: 'online' })
  console.log(`βββββββββββββββββββββββββββββββββββββββββββββ \n ${client.user.username} Bot BaΕarΔ± Δ°le BaΕlatΔ±ldΔ±! \n ββββββββββββββββββββββββββββββββββββββββββββββ `)
};
