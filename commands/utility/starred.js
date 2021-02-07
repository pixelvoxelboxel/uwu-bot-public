const useful_functions = require('../useful_functions.js');
var GitHub = require('github-api');
const gh = new GitHub();

const starredRepos = async(user_name) => {
    let data;
    const info = new Array;
    const usr = await gh.getUser(user_name);
    await usr.listStarredRepos(function(err, repos) {
        data = repos;
    });

    for(entry in data) {
        let curr_repo = data[entry];
        let repo_info = {url: curr_repo.html_url, description: curr_repo.description, name: curr_repo.name};
        info.push(repo_info);
    }
    return info;
}

module.exports = {
    name: 'starred',
    description: "Get a github repo given username and repo-name",
    async execute(message, args) {
        result_repo = await starredRepos(args[0]);
        for(itm in result_repo) {
            let curr_repo = result_repo[itm];
            let embed = useful_functions.makeEmbed(curr_repo.url, curr_repo.name, curr_repo.description);        
            message.channel.send(embed)
        }
    }
}