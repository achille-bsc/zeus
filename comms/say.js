const { Permissions, MessageEmbed, MessageCollector, Colors } = require('discord.js');
const commandeFormat = 'say [Message]';

module.exports.check = (args) => {
	return commandeFormat.split(' ')[0] == args[0];
};

/**
     *
     * @param {Discord.Message} msg
     */

module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		msg.reply('La commande n\'est pas encore disponnible')
		
		// msg.delete();
		// const nperm = {
		// 	title: 'Erreur !',
		// 	color: Colors.Red,
		// 	description: 'Vous n\'avez pas la permission d\'utiliser cette commande !'
		// }
		// if (!msg.member.permissions.has(Permissions.FLAGS.ManageMessages)) {
		// 	return msg.reply({ embeds: [nperm] });
		// }

		// const SayMessage = msg.content.slice(5).trim(' ');
		// msg.channel.send({ content: SayMessage });
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};