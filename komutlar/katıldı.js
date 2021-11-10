const { MessageEmbed, } = require("discord.js");
const ayar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    if (!message.member.hasPermission(ayar.toplantıyetkisi)) return; 
    let toplantiChannel = ayar.toplantıkanalı

    let katıldıRolü = ayar.katıldırolü
    let enaltyt = message.guild.roles.cache.get(ayar.enaltyt) 

    let sestekiler = message.guild.members.cache.filter(x => x.roles.highest.position >= enaltyt.position).filter(s => s.voice.channelID === toplantiChannel)
    let sesteolmayanlar = message.guild.members.cache.filter(x => x.roles.highest.position >= enaltyt.position).filter(s => s.voice.channelID !== toplantiChannel).filter(a => a.roles.cache.has(katıldıRolü))

    sestekiler.array().forEach((uye, index) => {
        setTimeout(async() => {
            uye.roles.add(katıldıRolü)
        }, index * 750)
    })
    sesteolmayanlar.array().forEach((uye, index) => {
        setTimeout(async() => {
            uye.roles.remove(katıldıRolü)
        }, index * 750)
    })
    message.channel.send(embed.setDescription(`
    Katıldı rolü verilecek yetkili sayısı: **${sestekiler.size}**
    Katıldı rolü alınacak yetkili sayısı: **${sesteolmayanlar.size}**
    `))
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  }
  
  exports.help = {
    name: 'katıldı'
};