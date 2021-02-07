const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const fs = require('fs');
const prefix = 'k!';

client.commands = new Discord.Collection();
const filepaths = [ './commands/fun', 
                    './commands/utility',
                    './commands/moderation'];
                    

// iterate through the filepaths and set commands for each filename
const getCommands = (filepaths) => {
    command_paths = new Array;
    filepaths.forEach((path)=> {
        list_files = fs.readdirSync(path).filter(file => file.endsWith('.js'));
        for (file of list_files) {
            const command = require(`${path}/${file}`)
            client.commands.set(command.name, command)
        }
    });
};
getCommands(filepaths)


// execute commands
client.on("message", function(message) { 
    if ((message.author.bot) || (!message.content.startsWith(prefix))) return;     
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    
    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(`there was an error trying to execute that command!`);
    }
});  
client.on("ready", () => {
    client.user.setActivity('k! | k!help to get help', { type: 'PLAYING' });
});

client.login(config.BOT_TOKEN);
