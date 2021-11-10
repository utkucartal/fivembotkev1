const Discord = require('discord.js');
const ayar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
  
if(![ayar.kesyetkisi].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR")))  
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
const keslog = message.guild.channels.cache.find(c => c.id === ayar.keslog)//Ban log kanalı  
const kanal = message.member.voiceChannel
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return;
if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
message.guild.member(member.id).voice.setChannel(null)
 
   message.channel.send(new Discord.MessageEmbed().setDescription(`${member} Kullancısının ${message.author} Tarafından Bağlantısı Kesildi.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#7289D').setTimestamp()).then(x => x.delete({timeout: 10000}));
   keslog.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Bağlantı Kesildi !**\n**Bağlantı Kesen Yetkili:** ${message.author.id} (\`${message.author.id}\`)\n**Bağlantısı Kesilen:** ${member.user.tag} (\`${member.user.id}\`)\ `));
}
exports.conf = { 
enabled: true, 
guildOnly: true, 
aliases: ["ses-kes"]
}

exports.help = {
   description: 'Belirtilen Kullanıcıyı Ses Kanalından Atar.',
name: "kes" 
}
