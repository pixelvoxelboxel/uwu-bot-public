const Discord = require("discord.js");
const useful_functions = require('../useful_functions.js')


module.exports = {
  name: "qoute",
  description: "Gives a random qoute to advise your very important life decisions",
  async execute(message) {
    var url = 'https://type.fit/api/quotes';
    const qoutes_json = await useful_functions.getData(url);
    var random_qoute = useful_functions.getRandom(qoutes_json);

    const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(random_qoute.author)
    .setDescription(random_qoute.text);

    message.channel.send(embed);
  } 
}