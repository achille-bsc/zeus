const { IntentsBitField } = require("discord.js");
const { Client } = require("discord.js");
const client = new Client({
  intents:
    IntentsBitField.Flags.Guilds |
    IntentsBitField.Flags.GuildMembers |
    IntentsBitField.Flags.GuildMessages |
    IntentsBitField.Flags.MessageContent |
    IntentsBitField.Flags.GuildVoiceStates |
    IntentsBitField.Flags.MessageContent,
});

const Ban = require("./comms/ban.js");
const Kick = require("./comms/kick.js");
const Clear = require("./comms/clear");
const Afk = require("./comms/afk");
const Unafk = require("./comms/unafk");
const Help = require("./comms/help");
const Say = require("./comms/say");
const Lock = require("./comms/lock");
const Unlock = require("./comms/unlock");
 
client.login(
  "MTAyMzI1MTM1NDU2NDcwNjM2NQ.GFu4F3.8xTU4zlCIR08q3E86rFEdwdsGQxKxgHNgq95-s"
);

client.on("ready", async () => {
  //TODO  suppresion commands
  /*console.log(client.guilds.cache.get('855926769780260905').commands.cache);
    await client.guilds.cache.get('855926769780260905').commands.fetch();
    console.log(client.guilds.cache.get('855926769780260905').commands.cache);

    client.guilds.cache.get('855926769780260905').commands.cache.map(command => {
        command.delete();
    });*/
  console.log(`Bot ${client.user.username}  connecté !`);
});

client.on("messageCreate", async (msg) => {
  // les commandes en MP
  if (msg.guild) {
    let args = msg.content.trim().toLocaleLowerCase().split(" ");
    //Commands avec prefix
    if (args[0].startsWith("-")) {
      args[0] = args[0].substring(1);

      if (Ban.check(args)) {
        return Ban.action(msg, args);
      }
      if (Kick.check(args)) {
        return Kick.action(msg, args);
      }
      if (Clear.check(args)) {
        return Clear.action(msg, args);
      }
      if (Afk.check(args)) {
        return Afk.action(msg, args);
      }
      if (Unafk.check(args)) {
        return Unafk.action(msg, args);
      }
      if (Help.check(args)) {
        return Help.action(msg, args);
      }
      if (Say.check(args)) {
        return Say.action(msg, args);
      }
      if (Lock.check(args)) {
        return Lock.action(msg, args);
      }
      if (Unlock.check(args)) {
        return Unlock.action(msg, args);
      }
    }
  }
});
