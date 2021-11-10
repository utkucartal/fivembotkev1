const Discord = require('discord.js');
const rdb = require('quick.db');
const moment = require('moment');
const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {
let whitelist = message.guild.roles.cache.find(r => r.id === ayarlar.whitelisted)
if(![ayarlar.whitelistedyetkisi].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`).then(x => x.delete({timeout: 5000}));
  const whitelistlog = message.guild.channels.cache.find(c => c.id === ayarlar.whitelistedlog)//Ban log kanalı  
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
  member.roles.remove(ayarlar.yeniüye)
  member.roles.add(ayarlar.whitelisted)
  let embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`${member} **kullanıcısına whitelist Rolü Verildi!**`)
  .setTimestamp()

message.channel.send(embed).then(x => x.delete({timeout: 5000}));
whitelistlog.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Whitelist Verildi !**\n**Whitelist Veren Yetkili:** ${message.author.id} (\`${message.author.id}\`)\n**whitelist verilen:** ${member.user.tag} (\`${member.user.id}\`)\ `));

} 
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['whitelist'],
  permLevel: 0
}
exports.help = {
  name: 'whitelist',
  description: "Belirtilen üyeye Whitelist rolü verir",
  usage: 'whitelist @kişi'
}
