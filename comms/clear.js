const { Permissions, MessageEmbed, MessageCollector } = require('discord.js');
const commandeFormat = 'clear';
const ALIAS = ['delete', 'effecer', 'éffacer', 'éfface', 'efface', 'supprime'];

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
		const nperm = new MessageEmbed()
			.setTitle('Erreur')
			.setColor('RED')
			.setDescription('Vous n\'avez pas la permission d\'utiliser cette commande.');
		if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return msg.channel.send({ embeds: [nperm] });

		const question = new MessageEmbed()
			.setTitle('Combien de messages souhaitez-vous supprimer ?')
			.setColor('GREEN');
		await msg.reply({ embeds: [question] })
			.catch(console.error());
		// utilisation du collector !
		const collector = new MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 30000 });
		collector.on('collect', async msgg => {
			if (msgg.author.id !== msg.author.id) return;
			if (msgg.content === 'cancel') {
				const annule = new MessageEmbed()
					.setTitle('Commande annulée !')
					.setColor('YELLOW');
				msgg.delete();
				const anul_send = await msgg.channel.send({ embeds:[annule] });
				setTimeout(() => {
					anul_send.delete();
				}, 5000);
				collector.stop();
			}
			if (msgg.content > 198 || msgg.content < 1) {
				const not_exact = new MessageEmbed()
					.setTitle('Vous devez citer un nombre compris entre 1 et 198')
					.setColor(colorC);
				msgg.channel.send({ embeds: [not_exact] })
					.catch(msgg.channel.send(new MessageEmbed() .setTitle('Vous devez mettre un nombre') .setDescription('Vous ne venez pas de citer un nombre. Vous devez citer un nombre compris entre 1 et 198')),
					);
			}
			else {
				const number = parseInt(msgg.content) + 3;
				if (number > 99) {
					const number1 = number / 2;
					const number2 = number / 2;
					if (number1 % 1 === 0.5) {
						const number3 = number1 + 0.5;
						const number4 = number2 - 0.5;
						msgg.channel.bulkDelete(number3, false).catch(console.error());
						await waiting(1000);
						msgg.channel.bulkDelete(number4, false).catch(console.error());
						await collector.stop();
					}
				}
				else {

					msgg.channel.bulkDelete(number, false);
					await collector.stop();
					const rep_emb = new MessageEmbed()
						.setTitle(`\`${number - 3}\` messages ont étés supprimés !`)
						.setColor('BLUE');
					const rep = await msgg.channel.send({ embeds: [rep_emb] });
					setTimeout(() => {
						rep.delete();
					}, 5000);
				}
			}
		});
	}

	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};
async function waiting(time = 5000) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}