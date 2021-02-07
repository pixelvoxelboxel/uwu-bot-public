const useful_functions = require('../useful_functions.js');
//const client = new Discord.Client();
/**
 * @param { ping } - The role to ping, optional
 * @param { link } - The link for the announcement, optional
 * @param { text } - announcement text
 * @param { title } - announcement title
 */

const makeAnnouncement = (title, text, link, ping) => {
    const data = new Array;
    const embed = useful_functions.makeEmbed(link, title, text);
    data.push(embed);
    if(typeof(ping) != 'undefined') data.push(`<@&${ping}>`);
    return data;
}

module.exports = {
    name: 'announce',
    description: 'Announce a message to a specified channel',
    execute(message, args) {
        const argument = args.toString().trim().replace(/,/g, ' ').split(' | ');
        const client = message.client;
        const channel = client.channels.cache.get(argument[0]);
        const data = makeAnnouncement(argument[1], argument[2], argument[3], argument[4]);
        channel.send(data[0]);
        channel.send(data[1]);
    }
}