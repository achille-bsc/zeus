const {
  Permissions,
  MessageEmbed,
  MessageCollector,
  Embed,
  Colors,
} = require("discord.js");
const commandeFormat = "clear [NomberDeMessages]";
const ALIAS = ["delete", "effecer", "éffacer", "éfface", "efface", "supprime"];

module.exports.check = (args) => {
  return commandeFormat.split(" ")[0] == args[0] || ALIAS.includes(args[0]);
};

/**
 *
 * @param {Discord.Message} msg
 */

module.exports.action = async (msg, args) => {
  if (commandeFormat.split(" ").length <= args.length) {
    // executer le code
		if (msg.deletable) await msg.delete();

    const messagesToDelete = parseInt(msg.content.split(" ")[1]);

    try {
      await msg.channel.bulkDelete(messagesToDelete);
      await msg.channel.send("✅ - Tout les messages ont bien été supprimés.");
    } catch (error) {
      msg.channel.send(
        "Impossible de supprimer des messages dans ce salon. Cette erreur est sûrement due à un problème de permissions"
			).then(() => {
				setTimeout((message) => {
					return message.delete();
				}, 5000);	
			})
    }
  } else {
    msg.reply(
      "Mauvaise commande, voila ce que j'attend **" + commandeFormat + "**"
    );
  }
};
