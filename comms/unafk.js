const commandeFormat = 'unafk';
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
        await msg.delete().catch();
        const member = msg.member
        await member.setNickname(`${member.user.username}`)
        msg.channel.send({ content: `<@${msg.author.id}> Je viens de vous retirrer le mode [AFK] !` });

    }
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};