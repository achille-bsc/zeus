const { MessageEmbed, Colors } = require("discord.js");

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
        const help = {
          fields: [
            {
              name: "-afk",
              value:
                "Pour indiquer dans votre pseudo que vous n'êtes pas disponible.",
            },
            {
              name: "-unafk",
              value: "Enlève votre statut afk de votre pseudo.",
            },
            {
              name: "-clear",
              value:
                "Pour supprimer un nombre de messages compris entre 1 et 99.",
            },
            {
              name: "-help",
              value: "Donne la liste des commandes disponnibles sur le bot.",
            },
            {
              name: "-kick",
              value: "Permet d'éxclure un membre du serveur.",
            },
            {
              name: "-ban",
              value: "Permet de bannir un membre du serveur.",
            },
            {
              name: "-say",
              value: "Permet d'envoyer un message sous l'identité du bot. [En cours de création]",
            },
          ],
          color: Colors.Blurple,
          title: "HELP - Liste de toutes les commandes",
        };
        msg.channel.send({ embeds: [help] })

    }
	else {
		msg.reply ('Mauvaise commande, voila ce que j\'attend **' + commandeFormat + '**');
	}
};