/*
* Uses a json endpoint for a google sheet
* first parse, the json data into a more readable format
* then, use it to make an embed thingy
*/
const Discord = require("discord.js");
const useful_functions = require('../useful_functions.js');

/* parse end point to get a better json from it
*/
const parse_endpoint = async (url, start, rows) => {
    data_tracker.current = start-1;
    let counted_rows = 1;
    let jobs_data = {};
    const data = await useful_functions.getData(url);
    const entries = data.feed.entry;
    let current_col = 0;
    // iterate thru the entries and print every data entry in the row
    for(let entry_col = start; counted_rows <= rows; entry_col += 1) {
         // increment when new row
         if(entry_col != start && entries[entry_col]["gs$cell"].row != entries[entry_col-1]["gs$cell"].row) {
            counted_rows += 1;
            if(counted_rows > rows) break;
        }
        let current_text = entries[entry_col].content['$t'].replace(/(?:\\[rn]|[\r\n]+)+/g, " ").trim();
        // make new array when new row
        if(typeof(jobs_data[counted_rows]) == "undefined") {
            jobs_data[counted_rows] = new Array;
            jobs_data[counted_rows].push("**" + current_text + "**");
        }
        else {
           jobs_data[counted_rows].push(current_text);
        }
        current_col = entry_col;
    }
    return [jobs_data, current_col, entries.length];
}

const make_text = async (data_json) => {
    let description = "Get the latest internship, programs, and volunteering listings. Credit to Ashley Ngo - ango8101@bths.edu and Alvin Xu.";
    
    for(job in data_json[0]) {
        let text = data_json[0][job].toString().replace(/,/gim,"\n");
        description += "\n\n\n" + text;
    }
    const embed = useful_functions.makeEmbed("Job Listings", "https://spreadsheets.google.com/feeds/cells/1l97Q-9_HMcvcxslNsG8XfWKkC4ehBYecvE7x_cqTRPs/1/public/full?alt=json",  description);
    return embed;
}

const prev_or_next = async(type, idx, sent, message) => {
    switch(type) {
        case "next":
            data_tracker.prev = data_tracker.current;
            break;
    }
    const new_json = await parse_endpoint("https://spreadsheets.google.com/feeds/cells/1l97Q-9_HMcvcxslNsG8XfWKkC4ehBYecvE7x_cqTRPs/1/public/full?alt=json", idx+1, 3);
    const new_embed = await make_text(new_json);
    sent.reactions.removeAll();
    sent.edit(new_embed);
    manage_reactions(11, new_json[1], new_json[2], sent, message);
}

let data_tracker = {"prev": 11, "current": 11};
const manage_reactions = (start, current, end, embed, message) => {
    console.log(data_tracker)
    //if (start != current) embed.react('⏮️') // prev;
    if (end != current) embed.react('⏭️') // next;
    embed.awaitReactions(
        (reaction, user) => user.id == message.author.id && (['⏭️', '⏮️'].includes(reaction.emoji.name)), 
        { max: 1, time: 60000, errors: ['time'] })
        .then(async collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === '⏭️') {
                prev_or_next("next", current, embed, message);
                
            } else {
                prev_or_next("back", data_tracker.prev, embed, message);
            }
            
        })
        .catch(collected => {
            
            message.reply('Time out, be faster next time!');
        });;
}
const test = async() => {
   const jobs_json = await parse_endpoint("https://spreadsheets.google.com/feeds/cells/1l97Q-9_HMcvcxslNsG8XfWKkC4ehBYecvE7x_cqTRPs/1/public/full?alt=json", 11, 3);
    
  console.log(jobs_json)
}
//test();

module.exports = {
    name: "jobs",
    description: "Get the latest internship, programs, and volunteering listings. Credit to Ashley Ngo - ango8101@bths.edu and Alvin Xu.",
    async execute(message) {  
        const jobs_json = await parse_endpoint("https://spreadsheets.google.com/feeds/cells/1l97Q-9_HMcvcxslNsG8XfWKkC4ehBYecvE7x_cqTRPs/1/public/full?alt=json", 11, 3);
 
        const embed = await make_text(jobs_json);
        message.channel.send(embed).then(sent => {
            data_tracker.current = 11;
            manage_reactions(11, 11, jobs_json[2], sent, message);
        });
    } 
  }