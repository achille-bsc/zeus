const { Colors, PermissionsBitField } = require('discord.js');
const commandeFormat = 'ban [membre]';
const ALIAS = [];

module.exports.check = (args) => {
	return (commandeFormat.split(' ')[0] === args[0] || ALIAS.includes(args[0]));
};

/**
 *
 * @param {Discord.Message} msg
 */
module.exports.action = async (msg, args) => {
	if (commandeFormat.split(' ').length <= args.length) {
		// executer le code
		msg.delete();
		const nperm = {
			title: 'Erreur',
			color: Colors.Red,
			description: 'Vous n\'avez pas la permission d\'utiliser cette commande.'
		}
		const nmention = {
			title: 'Erreur',
			color: Colors.Red,
			description: 'Vous n\'avez pas mentionné(e) de membres.'
		}
		
		if (!msg.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return msg.channel.send({ embeds: [nperm] });
		const member = msg.mentions.members.first();

		if (!member) return msg.channel.send({ embeds: [nmention] });

		try {
			await msg.guild.members.ban(member);
			const kicked = {
				title: `\`${member.user.tag}\` a été ***__banni(e)__*** avec succès !`,
				color: Colors.Green,
				description: `${member.user.tag} à été éxclu(e) avec succès par ${msg.author.tag}`,
			};

			msg.channel.send({ embeds: [kicked] });
		} catch (error) {
			msg.channel.send('Une erreur est survenue lors du bannissement de ce membre. Vous pouvez vérifier mes permissions sur le serveur puis réessayer.')
		}
	} else {
		await msg.reply('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
		return await msg.deletable ? msg.delete() : null;
	}
};