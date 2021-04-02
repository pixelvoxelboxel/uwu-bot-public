const Discord = require("discord.js");
const useful_functions = require('../useful_functions.js');
const database = require("../../database.js");


const parseArgs = (args) => {
    let new_dict = {description: args[2], link: args[3]};
    return new_dict;
}

// make embed to view links
const viewLinks = async(guildId, message) => {
    const collection = database.db_client.db("serverInfo").collection("guilds");
    const guild_db = await database.getGuild(parseInt(guildId));
    let find_info = await collection.findOne({ _id: parseInt(guildId)});
    find_info = find_info.links;
    let description_txt = "";
    for (info in find_info) {
        description_txt += `***${info}***\n${find_info[info].link}\n${find_info[info].description}\n\n\n`;
    }
    
    let embed = new Discord.MessageEmbed()
    .setTitle("Guild Links")
    .setDescription(description_txt)
    message.channel.send(embed);
    return;
}

//options to add & remove
const editLinks = (type, links_dict, name, info_dict = {}) => {
    switch(type){
        case "add":
            links_dict[name] = info_dict;
            break;
        case "remove":
            delete links_dict[name];
            break;
    }
    return;
}

// update links
const guildLinks = async (type, message, guildId, args) => {
    const user = message.member;
    // if not an admin cease
    if(!useful_functions.qualifyUsage(user, "ADMINISTRATOR")) {
        message.reply("Come back when you're older!");
        return;
    }
    const collection = database.db_client.db("serverInfo").collection("guilds");
    const guild_db = await database.getGuild(parseInt(guildId));
    let find_info = await collection.findOne({ _id: parseInt(guildId)});
    find_info = find_info.links;
    const info = parseArgs(args);
 
    editLinks(type, find_info, args[1], info);
    await collection.updateOne(guild_db, { 
        $set: {
            links: find_info
        }
    });
    
    return "Done";
}

module.exports = {
    name: 'links',
    async execute(message, args) {
        if(args.includes("close") && message.author.id == ADMIN_ID) {
            database.db_client.close();
            message.reply("Connection closed");
        }
        if(args.includes("add") || args.includes("remove")) {
            const res = await guildLinks(args[0], message, message.guild.id, args);
            message.reply(res);
        }
        else { //just view the links
            viewLinks(message.guild.id, message);
        }
    }
}
