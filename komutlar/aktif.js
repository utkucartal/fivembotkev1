const Discord = require('discord.js');
const moment = require('moment');
const ayarlar = require('../ayarlar.json');
require('moment-duration-format');
exports.run = async(client, message, args) => {
  if(![ayarlar.bakımveaktifyetki].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

let prometheus = new Discord.MessageEmbed()
.setThumbnail(`https://cdn.discordapp.com/attachments/895779514704068661/897941724452761630/indir.jpg`)
.addField("__**Sunucu Durumu**__", `**Aktiftir**`)
.addField("__**Giriş**__", `**Link e Tıklayarak Giriş Yapabilirsiniz. https://solidrp.net/**`)
.addField("__**SaltyChat Sürümü**__", `**<#858936497926569984> Kanalından Sürümü Güncelleyebilirsiniz veya kurulum yapabilirsiniz.**`)
.addField("__**Teamsepak3**__", `**SaltyChat'i açıp "tsadresi" yazarak ts3'e giriş yapabilirsiniz.**`)
    .setImage(`https://cdn.discordapp.com/attachments/895779514704068661/897941724452761630/indir.jpg`)
.setColor("RANDOM")
message.channel.send(prometheus)
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["aktif"],
    permLevel: 0
  }

  exports.help = {
    name: 'aktif'
  };