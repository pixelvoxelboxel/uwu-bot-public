const Discord = require("discord.js");
const useful_functions = require('../useful_functions.js')


module.exports = {
  name: "8ball",
  description: "What should you do? The magic 8ball shall help you!",
  async execute(message, args) {
    var url = `https://8ball.delegator.com/magic/JSON/${args.toString().replace(/,/g, ' ')}`;
    const qoutes_json = await useful_functions.getData(url);
    const magic = qoutes_json.magic
    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(magic.type)
    .setDescription(magic.answer);

    message.channel.send(embed);
  } 
}