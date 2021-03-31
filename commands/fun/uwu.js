const Discord = require("discord.js");
const useful_functions = require('../useful_functions.js');

/*
* l,r = w
* th = ff
* random UwwUs and OwOs
* add some stutters
*/

const stutter = (word) => {
    let stuttered = `${word.slice(0,2)}-${word}`;
    return stuttered;
}
const uwuify = (text) => {
    text = text.replace(/o/gmi, "owo").replace(/([lr])/gmi, "w").replace(/th/gmi, "ff");
    
    let list_of_words = text.split(' ');
    for(let i=0; i < list_of_words.length; i+=5) {
        let random_pain = ["UwU", "OwO"][Math.floor(Math.random() * 2)]
        list_of_words[i] = stutter(list_of_words[i]) + ' ' + random_pain;
    }
    return list_of_words.toString().replace(/,/g, ' ');
}
module.exports = {
    name: "uwu",
    description: "UwUify a message. I don't know why you're doing this, go to church.",
    async execute(message, args) {
        message.channel.send(uwuify(args.toString().replace(/,/g, ' ')));
    }
}