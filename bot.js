const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
const tags = require('common-tags')
//


var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
    ${files.length} komut yüklenecek.
‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`[KOMUT] | ${props.help.name} Eklendi.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

client.on('message', message => {
    if(["sg","oç","oçe","anan","ananı","ananı sikim","anneni sikim","anneni sikeyim","ananı sikeyim","annen","ağzına","ağzına sıçim","ağzına sıçayım","ağzına s","am","ambiti","amını","amını s","amcık","amcik","amcığını","amciğini","amcığını","amcığını s","amck","amckskm","amcuk","amına","amına k","amınakoyim","amına s","amunu","amını","amın oğlu","amın o","amınoğlu","amk","aq","amnskm","anaskm","ananskm","amkafa","amk çocuğu","amk oç","piç","amk ç","amlar","amcıklar","amq","amındaki","amnskm","ananı","anan","ananın am","ananızın","aneni","aneni s","annen","anen","ananın dölü","sperm","döl","anasının am","anası orospu","orospu","orosp,","kahpe","kahbe","kahße","ayklarmalrmsikerim","ananı avradını","avrat","avradını","avradını s","babanı","babanı s","babanın amk","annenin amk","ananın amk","bacı","bacını s","babası pezevenk","pezevenk","pezeveng","kaşar","a.q","a.q.","bitch","çük","yarrak","am","cibiliyetini","bokbok","bombok","dallama","göt","götünü s","ebenin","ebeni","ecdadını","gavat","gavad","ebeni","ebe","fahişe","sürtük","fuck","gotten","götten","göt","gtveren","gttn","gtnde","gtn","hassiktir","hasiktir","hsktr","haysiyetsiz","ibne","ibine","ipne","kaltık","kancık","kevaşe","kevase","kodumun","orosbu","fucker","penis","pic","porno","sex","sikiş","s1kerim","s1k","puşt","sakso","sik","skcm","siktir","sktr","skecem","skeym","slaleni","sokam","sokuş","sokarım","sokarm","sokaym","şerefsiz","şrfsz","sürtük","taşak","taşşak","tasak","tipini s","yarram","yararmorospunun","yarramın başı","yarramınbaşı","yarraminbasi","yrrk","zikeyim","zikik","zkym"
  ].some(a => message.content.includes(a)) && !message.member.hasPermission('ADMINISTRATOR')) message.delete();
  });
  client.on('message', message => {
    if([".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg"].some(a => message.content.includes(a)) && !message.member.hasPermission('ADMINISTRATOR')) message.delete();
  });
  
  
  
  client.on("messageUpdate", (old, nev) => {
    if (old.content != nev.content) {
      const yasak = [
        "discord.app",
        "discord.gg",
        "invite",
        "discordapp",
        "discordgg",
        ".com",
        ".net",
        ".xyz",
        ".tk",
        ".pw",
        ".io",
        ".me",
        ".gg",
        "www.",
        "https",
        "http",
        ".gl",
        ".org",
        ".com.tr",
        ".biz",
        ".party",
        ".rf.gd",
        ".az",
        "sg",
        "oç",
        "oçe",
        "anan",
        "ananı",
        "ananı sikim",
        "anneni sikim",
        "anneni sikeyim",
        "ananı sikeyim",
        "annen",
        "ağzına",
        "ağzına sıçim",
        "ağzına sıçayım",
        "ağzına s",
        "am",
        "ambiti",
        "amını",
        "amını s",
        "amcık",
        "amcik",
        "amcığını",
        "amciğini",
        "amcığını",
        "amcığını s",
        "amck",
        "amckskm",
        "amcuk",
        "amına",
        "amına k",
        "amınakoyim",
        "amına s",
        "amunu",
        "amını",
        "amın oğlu",
        "amın o",
        "amınoğlu",
        "amk",
        "aq",
        "amnskm",
        "anaskm",
        "ananskm",
        "amkafa",
        "amk çocuğu",
        "amk oç",
        "piç",
        "amk ç",
        "amlar",
        "amcıklar",
        "amq",
        "amındaki",
        "amnskm",
        "ananı",
        "anan",
        "ananın am",
        "ananızın",
        "aneni",
        "aneni s",
        "annen",
        "anen",
        "ananın dölü",
        "sperm",
        "döl",
        "anasının am",
        "anası orospu",
        "orospu",
        "orosp,",
        "kahpe",
        "kahbe",
        "kahße",
        "ayklarmalrmsikerim",
        "ananı avradını",
        "avrat",
        "avradını",
        "avradını s",
        "babanı",
        "babanı s",
        "babanın amk",
        "annenin amk",
        "ananın amk",
        "bacı",
        "bacını s",
        "babası pezevenk",
        "pezevenk",
        "pezeveng",
        "kaşar",
        "a.q",
        "a.q.",
        "bitch",
        "çük",
        "yarrak",
        "am",
        "cibiliyetini",
        "bokbok",
        "bombok",
        "dallama",
        "göt",
        "götünü s",
        "ebenin",
        "ebeni",
        "ecdadını",
        "gavat",
        "gavad",
        "ebeni",
        "ebe",
        "fahişe",
        "sürtük",
        "fuck",
        "gotten",
        "götten",
        "göt",
        "gtveren",
        "gttn",
        "gtnde",
        "gtn",
        "hassiktir",
        "hasiktir",
        "hsktr",
        "haysiyetsiz",
        "ibne",
        "ibine",
        "ipne",
        "kaltık",
        "kancık",
        "kevaşe",
        "kevase",
        "kodumun",
        "orosbu",
        "fucker",
        "penis",
        "pic",
        "porno",
        "sex",
        "sikiş",
        "s1kerim",
        "s1k",
        "puşt",
        "sakso",
        "sik",
        "skcm",
        "siktir",
        "sktr",
        "skecem",
        "skeym",
        "slaleni",
        "sokam",
        "sokuş",
        "sokarım",
        "sokarm",
        "sokaym",
        "şerefsiz",
        "şrfsz",
        "sürtük",
        "taşak",
        "taşşak",
        "tasak",
        "tipini s",
        "yarram",
        "yararmorospunun",
        "yarramın başı",
        "yarramınbaşı",
        "yarraminbasi",
        "yrrk",
        "zikeyim",
        "zikik",
        "zkym"
      ];
      if (yasak.some(banned => nev.content.includes(banned))) {
        if (!nev.member.hasPermission("ADMINISTRATOR")) {
          try {
            nev.delete();
            nev.channel.send(
              `<@${nev.author.id}>, bu sunucuda mesajını düzenleyerek küfür edemez veya reklam yapamazsın!`
            );
            nev.author.send(
              `<@${nev.author.id}>, **${nev.guild.name}** adlı sunucuda mesajını düzenleyerek küfür edemez veya reklam yapamazsın!`
            );
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
});


client.on("message", message => {
    if(message.content.toLowerCase() == "sa") 
    return message.channel.send(`${message.author}, Aleyküm Selam.`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "selam") 
    return message.channel.send(`${message.author}, Selam hoşgeldin.`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "merhaba") 
    return message.channel.send(`${message.author}, Merhaba hoşgeldin.`)
});


client.on("message", message => {
    if(message.content.toLowerCase() == "s.a") 
    return message.channel.send(`${message.author}, Aleyküm Selam.`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "mrb") 
    return message.channel.send(`${message.author}, Aleyküm Selam.`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "slm") 
    return message.channel.send(`${message.author}, Selam hoşgeldin.`)
});


client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});

//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\


//--------------------------------------------------------------------------------------\\

client.on('messageDelete', message => {
  const data = require("quick.db")
  data.set(`snipe.mesaj.${message.guild.id}`, message.content)
  data.set(`snipe.id.${message.guild.id}`, message.author.id)

})
client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
    if (msg.author.bot) return;
    if (msg.content.length > 1) {
      if (db.fetch(`capslock_${msg.guild.id}`)) {
        let caps = msg.content.toUpperCase();
        if (msg.content == caps) {
          if (!msg.member.permissions.has("ADMINISTRATOR")) {
            if (!msg.mentions.users.first()) {
              msg.delete();
              return msg.channel.send(`${msg.member}, Capslock Kapat Lütfen!`).then(nordx => nordx.delete({timeout: 5000}))
                
            }
          }
        }
        
      }
    }
  });


    
  
  client.on("ready", async () => {
    let botVoiceChannel = client.channels.cache.get(ayarlar.botVoiceChannelID);
    if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  });

  client.on("voiceStateUpdate",(oldMember, newMember) => {

    if(newMember.channelID != null) {
    db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
    }
    
    if(newMember.channelID == null) {
    db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
    }
    
     if (oldMember.channelID  != newMember.channelID  ) {
    db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
    db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
    }
    })
    
    client.tarihHesapla = (date) => {
      const startedAt = Date.parse(date);
      var msecs = Math.abs(new Date() - startedAt);
    // [tarihHesapla] Yashinu'den aldım.
      const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
      msecs -= years * 1000 * 60 * 60 * 24 * 365;
      const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
      msecs -= months * 1000 * 60 * 60 * 24 * 30;
      const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
      msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
      const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
      msecs -= days * 1000 * 60 * 60 * 24;
      const hours = Math.floor(msecs / (1000 * 60 * 60));
      msecs -= hours * 1000 * 60 * 60;
      const mins = Math.floor((msecs / (1000 * 60)));
      msecs -= mins * 1000 * 60;
      const secs = Math.floor(msecs / 1000);
      msecs -= secs * 1000;
    
      var string = "";
      if (years > 0) string += `${years} yıl ${months} ay`
      else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
      else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
      else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
      else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
      else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
      else if (secs > 0) string += `${secs} saniye`
      else string += `saniyeler`;
    
      string = string.trim();
      return `\`${string} önce\``;
    }; 
    client.on("guildMemberAdd", async member => {
        if (member.user.bot) {
          await member.roles.add(ayarlar.botrol)
        } else {
         await  member.roles.add([ayarlar.yeniüye])
        };
      });
//snipe
    client.on("messageDelete", async message => {
        const cdb = require("orio.db")
            if (message.author.bot) return;
            if (message.content.length > "200") {
                cdb.push(`snipe.${message.guild.id}`, {
                    authors: message.author.username,
                    contents: "Silinen mesaj 200 karakteri aşıyor!",
                    tarih: Date.now()
                })
            } else {
                cdb.push(`snipe.${message.guild.id}`, {
                    authors: message.author.username,
                    contents: message.content,
                    tarih: Date.now()
                })
            }
        })
