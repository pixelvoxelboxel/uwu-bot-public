const helpCommand = (message, args, commands, prefix, data) => {
    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    data.push(`**Name:** ${command.name}`);
  
    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    return data
}

module.exports = {
    name: "help",
    description: "List all of my commands or info about a specific command.",
    aliases: ["commands"],
    usage: "[command name]",
    cooldown: 5,
    execute(message, args) {
      let data = [];
      const prefix = "k!";
      const { commands } = message.client;
  
      if (!args.length) {
        data.push("Here's a list of all my commands:");
        data.push(commands.map((command) => command.name).join(", "));
        data.push(
          `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
        );

        return message
          .reply(data, { split: true })
         
      }
      
      data = helpCommand(message, args, commands, prefix, data);
      message.channel.send(data, { split: true });
    },
  };
  