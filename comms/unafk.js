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
        if (msg.deletable) {
          await msg.delete();
        }

        try {
          member.setNickname(`${member.user.username}`);
          msg.channel.send({
            content: `<@${msg.author.id}> Je viens de vous mettre [AFK] !`,
          });
        } catch (error) {
          msg.channel.send(
            `<@${msg.author.id}>, impossible de vous retirer le mode AFK. Il est possible que vous soyez trop haut dans la hierarchie, ou que certaines permissions me fassent défaut.`
          );
        }

    }
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};
