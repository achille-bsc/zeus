const { MessageEmbed } = require('discord.js');
const commandeFormat = 'lock';
const ALIAS = ['verouiller', 'vérouiller'];
const fs = require('fs');
const lock_chann = require('../dblock.json');


module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] == args[0] || ALIAS.includes(args[0]));
};

/**
 *
 * @param {Discord.Message} msg
 */

module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		msg.delete();
		const everlock = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Ce salon est déjà vérrouillé.');
		const locked = new MessageEmbed()
			.setTitle('Vérouillé !')
			.setColor('GREEN')
			.setDescription('**__Ce salon a été verrouillé avec succès !__**');
		const channel = msg.mentions.channels.first() || msg.channel;
		if (lock_chann.lockedChannels.includes(channel.id)) return msg.channel.send({ embeds: [everlock] });
		lock_chann.lockedChannels.push(channel.id);
		fs.writeFileSync('./dblock.json', JSON.stringify(lock_chann));
		msg.channel.send({ embeds: [locked] });
	}
	else {
		msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};