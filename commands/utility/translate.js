const morse_files = require('../morse.js');

const encode = (sentence, json) => {
    const sent = sentence.split(' ');
    const decoded = new Array;
    for(idx in sent) {
        console.log()
        let word = sent[idx];
        let word_arr = new Array;
        for(letter in word) {
            let translation = json[word[letter]] + " ";
            word_arr.push(translation);
        }
        decoded.push(word_arr.toString().replace(/,/g, ''));
    }
    return decoded.toString().replace(/,/g, ' / ');
}

const decode = (sentence, json) => {
    const sent = sentence.split(' ');
    const encoded = new Array;
    for(idx in sent) {
        let word = sent[idx];
        let translation = json[word];
        if(translation == undefined) {
            translation = ' '
        }
        encoded.push(translation)
    }
    return encoded.toString().replace(/,/g, '');    
}

const translate = (sentence, type, json) => {
    switch(type) {
        case 'decode':
            return decode(sentence, json);
        case 'encode':
            return encode(sentence, json);
    }
}

module.exports = {
    name:'translate',
    description:'Translate either into morse or from morse to english',
    usage: '[message] | [encode][decode]',
    execute(message, args) {
        let morse_json;
        const argument = args.toString().trim().replace(/,/g, ' ').split(' | ');
        console.log(message);
        if(argument[1] == 'encode') {morse_json = morse_files.morse_code_encode}
        else {morse_json = morse_files.morse_code_decode}

        message.channel.send(translate(argument[0], argument[1], morse_json))
    }
}