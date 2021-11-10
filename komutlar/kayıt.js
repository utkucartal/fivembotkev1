const Discord = require('discord.js');
const ms = require('ms')
const ayar = require('../ayarlar.json')


exports.run = async(client, message, args) => {
  if(![ayar.yeniüye].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 

if(message.channel.id !== ayar.Kayıtkanal) return


message.channel.send(`**Kayıt Bekleme Odasına Geçerek Bekleyebilirsiniz , Müsait Olan Bir Yetkilimiz Sizinle İlgilenecektir.||<@&> <@&> <@&>||**`)
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["Kayıt","Kayıt"],
    permLevel: 0
  }

  exports.help = {
    name: 'Kayıt'
  };