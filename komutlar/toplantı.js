const { MessageEmbed, } = require("discord.js");
const ayar = require('../ayarlar.json')



exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.some(x => [ayar.toplantıyetkisi].includes(x))) return message.reply("Bu Komutu Kulanmaya Yetkin Yok :slight_frown: ")
  const toplantılog = message.guild.channels.cache.find(c => c.id === ayar.toplantılog)//Ban log kanalı    
  let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    if (!message.member.hasPermission(8)) return;
    if (!message.member.voice) return;
    let kanal = message.member.voice.channel
    kanal.createInvite().then(invite => {
        message.channel.send(embed.setDescription(`
    **#${kanal.name}** Adlı kanalda toplantı başladı.

    **Kanala gitmek için [KATIL](https://discord.gg/${invite.code}) Katıla Basman yeterli.**`))
    toplantılog.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**toplantı Başlatıldı !**\n**Başlatan Yetkili:** ${message.author.id} (\`${message.author.id}\`)`));
    })
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["başlat"],
    permLevel: 0
  }

  exports.help = {
    description: 'Toplantı Başlatır.',
    name: 'toplantı-başlat'
  };