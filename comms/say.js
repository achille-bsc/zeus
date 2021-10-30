const { Permissions, MessageEmbed, MessageCollector } = require('discord.js');
const commandeFormat = 'say';

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
		msg.delete();
		const nperm = new MessageEmbed()
			.setTitle('Erreur !')
			.setColor('RED')
			.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande !');
		if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return msg.reply({ embeds: [nperm] });
		if (!args[1]) {
			const saymsg = await msg.channel.send('Quelle message voullez-vous envoyer par le biai du bot ? ( Vous avez 1 minute avant que la commande ne soit annulée )');
			const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
			collector.on('collect', msg2 => {
				msg2.delete();
				if (msg2.author.bot) return;
				const msgcontent = msg2.content;
				msg2.channel.send({ content: msgcontent });
				saymsg.delete();
				collector.stop();
			});

		}
		const SayMessage = msg.content.slice(5).trim(' ');
		if (args[1]) {
			msg.channel.send({ content: SayMessage });
		}
	}
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};