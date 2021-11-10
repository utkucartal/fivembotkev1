const Discord = require('discord.js');
const rdb = require('quick.db');
const moment = require('moment');
const ayarlar = require("../ayarlar.json")
exports.run = async (client, message, args) => {
let Lady = message.guild.roles.cache.find(r => r.id === ayarlar.Lady)

if(![ayarlar.ladyetkisi].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`).then(x => x.delete({timeout: 5000}));
  const ladylog = message.guild.channels.cache.find(c => c.id === ayarlar.ladylog)  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
 member.roles.add(ayarlar.bayanüye)
  let embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`${member} **kullanıcısına Lady Rolü Verildi!**`)
  .setTimestamp()

message.channel.send(embed).then(x => x.delete({timeout: 5000}));
ladylog.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Lady Verildi !**\n**Lady Veren Yetkili:** ${message.author.id} (\`${message.author.id}\`)\n**Lady verilen:** ${member.user.tag} (\`${member.user.id}\`)\ `));
} 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['Lady','lady'],
  permLevel: 0
}
exports.help = {
  name: 'Lady',
  description: "Belirtilen üyeye Lady rolü verir",
  usage: 'Lady @kişi'
}
