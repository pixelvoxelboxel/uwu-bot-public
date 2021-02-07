const Discord = require("discord.js");
const useful_functions = require('../useful_functions.js');

const embedCute = async() => {
    const links = ['https://api.thecatapi.com/v1/images/search?limit=1', 'https://api.thedogapi.com/v1/images/search?limit=1']
    var url = useful_functions.getRandom(links);
    const cute_info = await useful_functions.getData(url);
    const cute_embed = new Discord.MessageEmbed()
	  .setColor('#0099ff')
    .setTitle('Your Adorable Overlord')
    .setImage(cute_info[0].url)
    .setDescription("Praise be to the cute overlord");

    return cute_embed;
}

module.exports = {
    name: "cute",
    description: "Gives a random cute kitty for you to serve",
    async execute(message) {
      const image_embed = await embedCute();
      message.channel.send(image_embed);
    } 
  }