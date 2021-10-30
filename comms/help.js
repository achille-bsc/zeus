const { MessageEmbed } = require("discord.js");

const commandeFormat = 'help';
const ALIAS = ['aide'];

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
		await msg.delete().catch()
        const help = new MessageEmbed()
            .setTitle('Liste des commandes')
            .setColor('#0C86F4')
            .addField('-afk', 'Pour indiquer dans votre pseudo que vous n\'êtes pas disponible.')
            .addField('-unafk', 'Enlève votre statut afk de votre pseudo.')
            .addField('-clear', 'Pour supprimer un nombre de messages compris entre 1 et 198.')
            .addField('-help', 'Donne la liste des commandes disponnibles sur le bot.')
            .addField('-kick', 'Permet d\'éxclure un membre du serveur.')
            .addField('-ban', 'Permet de bannir un membre du serveur.')
            .addField('-stats', 'Pour voir tes statistiques.')
        ;
        msg.channel.send({ embeds: [help] })

    }
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};