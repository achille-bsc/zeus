const commandeFormat = 'afk';
const ALIAS = [];

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
		if(msg.author.id === '636446688969490433'){
			await msg.delete().catch()
			msg.channel.send({ content: `<@${msg.author.id}> Je viens de vous mettre [AFK] !` });
		} else {
			await msg.delete().catch()
			const member = msg.member
			await member.setNickname(`[AFK] - ${member.user.username}`).catch()
			msg.channel.send({ content: `<@${msg.author.id}> Je viens de vous mettre [AFK] !` });
		}
    }
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};