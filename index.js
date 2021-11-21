const { Discord, WebhookClient, MessageAttachment, MessageEmbed, MessageActionRow, MessageButton, SelectMenuInteraction, GuildMemberRoleManager, ContextMenuInteraction, MessageSelectMenu, Permissions, GuildMemberManager, Intents, playFile, BaseManager } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')
const { Client } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS] });


const Ban = require("./comms/ban.js");
const Kick = require('./comms/kick.js');
const Clear = require('./comms/clear')
const Afk = require('./comms/afk')
const Unafk = require('./comms/unafk')
const Help = require('./comms/help')
const Say = require('./comms/say')
const Lock = require('./comms/lock')
const Unlock = require('./comms/unlock')

client.login('OTAzNzY0MzM1MTMyODE1NDYx.YXxuIA.ueqZfHwRrrGFoy2JIojuZwJYNBU');
client.on('ready', async () => {

    //TODO  suppresion commands
    /*console.log(client.guilds.cache.get('855926769780260905').commands.cache);
    await client.guilds.cache.get('855926769780260905').commands.fetch();
    console.log(client.guilds.cache.get('855926769780260905').commands.cache);

    client.guilds.cache.get('855926769780260905').commands.cache.map(command => {
        command.delete();
    });*/
    console.log('Bot op, chêf !')


});


client.on('messageCreate', async msg => {
    
    
        
        // les commandes en MP
        
        if(msg.guild){
            let args = msg.content.trim().toLocaleLowerCase().split(" ")
    
    
            //Commands sans prefix
    
            //Commands avec prefix
            if(args[0].startsWith('-')){
                args[0] = args[0].substring(1)
    
                if(Ban.check(args))
                    return Ban.action(msg, args)
                if(Kick.check(args))
                    return Kick.action(msg, args)
                if(Clear.check(args))
                    return Clear.action(msg, args)
                if(Afk.check(args))
                    return Afk.action(msg, args)
                if(Unafk.check(args))
                    return Unafk.action(msg, args)
                if(Help.check(args))
                    return Help.action(msg, args)
                if(Say.check(args))
                    return Say.action(msg, args)
                if(Lock.check(args))
                    return Lock.action(msg, args)
                if(Unlock.check(args))
                    return Unlock.action(msg, args)
            }
        }
        
    })




const xpfile = require('./levels.json')
const fs = require('fs')
const Canvas = require('canvas');
client.on('messageCreate', async msg => {
    if(msg.author.bot) return
    if(msg.content.startsWith('-stats')){
        //msg.delete()
        
        let msg_replyed = await msg.channel.send('Chargement de votre carte...').catch()	

        let user = msg.author

        const canvas = Canvas.createCanvas(2913, 1828);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('Frame_13.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = "#74037b";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        let level = xpfile[user.id].level
        let exp = xpfile[user.id].xp
        let messages_devtime = xpfile[user.id].msg
        let color01 = '#fff'
        let color02 = '#fff'

        const name = user.username.length > 30 ? user.username.substring(0, 11) + '...': user.username;
        
        Canvas.registerFont('Lato-Light.ttf', { family: 'Lato_Sans' })
        //Canvas.registerFont('DevTimeSans-Bold_2.ttf', { family: 'DevTime_Sans2' })

        ctx.font = '110px Lato_Sans';
        ctx.fillStyle = color01;
        ctx.fillText(`${name}`, 1040, 500);

        ctx.font = '85px Lato_Sans';
        ctx.fillStyle = color02;
        ctx.fillText(`Niveau: ${level}`, 550, 650);

        ctx.font = '85px Lato_Sans';
        ctx.fillStyle = color02;
        ctx.fillText(`Messages: ${messages_devtime}`, 550, 775);

        ctx.font = '85px Lato_Sans';
        ctx.fillStyle = color02;
        ctx.fillText(`EXP : ${exp}`, 550, 900);
        
        // Pick up the pen
        ctx.beginPath();

        // Start the arc to form a circle
        ctx.arc(1500, 1000, 250, 0, Math.PI * 2, true);

        // Put the pen down
        ctx.closePath();

        // Clip off the region you drew on
        ctx.clip();

        /*ctx.font = '120px Lato_Sans';
        ctx.fillStyle = "#ffffff";
        
        
        ctx.fillText(`${name}`, 230, 4390);*/
        const avatar = await Canvas.loadImage(user.displayAvatarURL( { format: 'jpg' } ));
        //ctx.drawImage(avatar, 1500, 650, 500, 500)
        ctx.drawImage(avatar, 1250, 750, 500, 500);


        const attachment = new MessageAttachment(canvas.toBuffer(), 'custom__image.png');
        msg_replyed.edit( { files: [attachment], content: 'Voici votre carte:' } );

        /*let embed = new MessageEmbed()
        .setTitle('Carte des Niveaux')
        .setColor('GREEN')
        .addField(`Level: ${xpfile[msg.author.id].level}`)
        .addField(`XP : ${xpfile[msg.author.id].xp}/${xpfile[msg.author.id].reqxp}`)
        .addField(`XP jusqu\'au niveau suivant : ${(xpfile[msg.author.id].reqxp - xpfile[msg.author.id].xp)}`)*/
        
        //msg.reply(`tu es actuellement au level ${xpfile[msg.author.id].level}`)
        //msg.reply(`Vous êtes actuellement au niveau ${xpfile[msg.author.id].level}`)
    }
    var addXP = Math.floor(Math.random() * 8 ) +3

    if(!xpfile[msg.author.id]){
        xpfile[msg.author.id] = {
            xp: 0,
            level: 1,
            reqxp: 100,
            msg: 0,
            commentaire: 'default'
        }
        fs.writeFile('./levels.json', JSON.stringify(xpfile), function(err){
            if(err) console.log(err)
        })
    }
    xpfile[msg.author.id].xp += addXP
    xpfile[msg.author.id].msg += 1

    if(xpfile[msg.author.id].xp > xpfile[msg.author.id].reqxp){
        xpfile[msg.author.id].xp -= xpfile[msg.author.id].reqxp
        xpfile[msg.author.id].reqxp *=1.25
        xpfile[msg.author.id].reqxp = Math.floor(xpfile[msg.author.id].reqxp)
        xpfile[msg.author.id].level += 1


        const rank = new MessageEmbed()
            .setTitle('Nouveau Level !')
            .setColor('GREEN')
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setDescription(`Vous venez d'atteindre le niveau : **${xpfile[msg.author.id].level}**
            Il vous faudra un total de **${xpfile[msg.author.id].reqxp}**xp pour atteindre le niveu suivant
            Vous avez **${xpfile[msg.author.id].xp}**/**${xpfile[msg.author.id].reqxp}** xp !`)
        //`Vous venez de passer au level ${xpfile[msg.author.id].level} !`
        msg.reply( { embeds: [rank] } )
    }

    fs.writeFile("./xpfile.json", JSON.stringify(xpfile), function(err){
        if(err) console.log(err)
    })

})
