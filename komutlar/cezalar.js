const Discord = require('discord.js');
const fs = require('fs');
const ayar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.some(x => [ayar.cezayetkisi].includes(x))) return message.reply("Bu Komutu Kulanmaya Yetkin Yok :frowning2:")
        const cezalarlog = message.guild.channels.cache.find(c => c.id === ayar.cezalog)//ceza log kanalı  
        let embed = new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setTimestamp().setFooter(ayar.sunucuisim)
        let roller = [
            { rol: ayar.ceza1, no: "1" },
            { rol: ayar.ceza2, no: "2" },
            { rol: ayar.ceza3, no: "3" },
            { rol: ayar.ceza4, no: "4" },
            { rol: ayar.ceza5, no: "5" },
        ]
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.channel.send(embed.setDescription(`**Bir üye etiketlemelisiniz veya idsini girmelisiniz.**`))
        message.channel.send(embed.setDescription(`${member} - (\`${member.id}\`) üyesine verilecek rolün numarasını yazmalısınız.
    
    ${roller.map(a => `\`${a["no"]}.\` ${message.guild.roles.cache.get(a["rol"])}`).join('\n')}
       `)).then(async mesaj => {
    
    const filter = m => m !== null && m.author.id == message.author.id;
    message.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']})
    .then(collected => {
        roller.forEach(a => {
            Object.keys(a).forEach(b => {
                if(b == "no" && a[b] == collected.first().content) {
                     member.roles.add(a["rol"])
                     message.channel.send(embed.setDescription(`${member} üyesine <@&${a["rol"]}> rolü başarıyla verildi.`))
                     mesaj.delete({timeout: 2000})
                     cezalarlog.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Ceza Verildi !**\n**Ceza Veren Yetkili:** ${message.author.id} (\`${message.author.id}\`)\n**Ceza verilen:** ${member.user.tag} (\`${member.user.id}\`)\n**Verilen Ceza **\`<@&${a["rol"]}>\'`));   

                   } 
               })
            })
         }) 
    })
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["Ceza","ceza"],
    permLevel: 0
  }

  exports.help = {
    name: 'Ceza'
  };
