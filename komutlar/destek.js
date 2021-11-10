const Discord = require('discord.js');
const ms = require('ms')
const ayar = require('../ayarlar.json')


exports.run = async(client, message, args) => {
  if(![ayar.whitelisted].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 

if(message.channel.id !== ayar.destekanal) return


message.channel.send(`**Destek Bekleme Odasına Geçerek Bekleyebilirsiniz , Müsait Olan Bir Yetkilimiz Sizinle İlgilenecektir.||<@&843421815631118387> <@&843421811965820928> <@&843421817090736139>||**`)
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["Destek","destek"],
    permLevel: 0
  }

  exports.help = {
    name: 'Destek'
  };