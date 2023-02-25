const { Permissions, MessageEmbed, Colors } = require('discord.js');
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

		const nlock = {
			title: 'Erreur !',
			color: Colors.Red,
			description: 'Ce salon n\'est pas vérrouillé.'
		}

		const unlocked = {
      title: "Dévérouillage !",
      color: Colors.Green,
      description: "___***Ce salon a été déverrouillé !***___",
    };

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