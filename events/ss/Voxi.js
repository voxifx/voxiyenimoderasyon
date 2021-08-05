const discord = require('discord.js')
const fs = require('fs')

class DB {
    constructor(){

    }


    yaz(veri, değer){
        const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
        dosya[veri] = değer
        return fs.writeFileSync('database.json', JSON.stringify(dosya, null, 1))
    }


 bul(veri){
   const dosya = JSON.parse(fs.readFileSync('database.json', 'utf8'))
   if (!dosya[veri]) return console.log('Böyle bir veri yok -- Erkek.js')
   return dosya[veri]
 }
}
module.exports = new DB()
