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


