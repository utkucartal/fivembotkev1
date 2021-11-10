exports.run = async(client, message, args) => {
const Discord = require("discord.js")
const ayar = require('../ayarlar.json')


 
if(![ayar.sunucubilgiyetkisi].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

    message.channel.send(new Discord.MessageEmbed().setTitle(`Sunucu Bilgi istatistikleri:`).setColor("#36393f").setDescription(`
    \`•\` Sunucuda toplam **${message.guild.memberCount}** kişi bulunmakta.
    \`•\` Son 1 Saatte Giren Üyeler  **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 3600000).size}**
    \`•\` Son 1 Günde Giren Üyeler  **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size}**
    \`•\` Son 1 Haftada Giren Üyeler **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size}**
    \`•\` Son 1 Ayda Giren Üyeler **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size}**`)
    .setThumbnail(message.guild.iconURL)
    .setFooter(message.guild.name, message.guild.iconURL)
    .setTimestamp())
  };
  
  module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    kategori: "sunucu"
  };
  module.exports.help = {
    name: "sunucu-bilgi",
    description: "sunucu istatistik",
    usage: "sunucu-bilgi"
  };
  