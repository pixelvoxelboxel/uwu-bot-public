const fetch = require('node-fetch');
const Discord = require("discord.js");
const getData = async(url) => {
    let data;
    await fetch(url)
    .then(res => Promise.all([res.status, res.json()]))
    .then(([status,jsonData]) => {
      data = jsonData;
    });
    return data;
}

const getRandom = (arr) => {
  let random_idx = Math.floor(Math.random() * arr.length);
  return arr[random_idx];
}

const makeEmbed = (name, url, description) => {
  let embed = new Discord.MessageEmbed()
  .setTitle(name)
  .setDescription(description)
  .setURL(url);
  return embed;
}
exports.getRandom = getRandom;
exports.getData = getData;
exports.makeEmbed = makeEmbed;