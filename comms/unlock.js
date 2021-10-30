const { Permissions, MessageEmbed } = require('discord.js');
const commandeFormat = 'unlock';
const ALIAS = [];
const Lock = require('../dblock.json');
const fs = require('fs');

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
 *
 * @param {Discord.Message} msg
 */

module.exports.action = (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		msg.delete();
		const nperm = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.');
		const nlock = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Ce salon n\'est pas vérrouillé.');
		const unlocked = new MessageEmbed()
			.setTitle('Dévérouillage !')
			.setColor('GREEN')
			.setDescription('___***Ce salon a été déverrouillé !***___');

		if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
			return msg.channel.send({ embeds: nperm });
		}

		const channel = msg.mentions.channels.first() || msg.channel;
		if (!Lock.lockedChannels.includes(channel.id)) {
			return msg.channel.send({ embeds: [nlock] });
		}
		Lock.lockedChannels.splice(Lock.lockedChannels.indexOf(channel.id), 1);
		fs.writeFileSync('./dblock.json', JSON.stringify(Lock));
		msg.channel.send({ embeds: [unlocked] });
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};