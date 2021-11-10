const Discord = require('discord.js');
const ayar = require('../ayarlar.json')
let prefix = ayar.prefix;


exports.run = function(client, msg) {
//Kodlar
  let mesaj = msg.mentions.members.first();
let msgd = msg.content.substring(3);
if(!mesaj){
  msg.reply('**❌ DM atmam için bir kullanıcı etiketlemelisin.! ['+prefix+'dm Mesaj @Kullanıcı]**');
}if(mesaj){
  if(!msg.member.hasPermission("ADMISTRATOR")){
    msg.reply('**❌ Yetkiniz yetmiyor..**');
  }else{
    mesaj.send(''+msgd+'')
    if(msg.author.id === ayar.dmkisi){ //sahip id
         
      msg.reply('**Mesaj gönderildi! ✅**');
    }
    else{
      msg.reply('**❌Bunu yapamazsınız....**');
    }
  }
}
};

exports.conf = {
  enabled: true, //komutut açtık
  guildOnly: false, //sadece servere özel yapmadık
  aliases: ['dm'], //farklı çağrılar ekledik
  permLevel: 0 //kimlerin kullanabileceğini yazdık (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name:'dm', //adını belirledik (kullanmak için gereken komut)
  description: 'Belirlediğiniz kişiye DMden mesaj atar.', //açıklaması
  usage: 'dm' //komutun kullanım şekli (mesela hava )
};