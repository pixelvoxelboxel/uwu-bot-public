module.exports = {
    name: 'problem',
    description: 'Get a problem from codeforces given number and letter',
    execute(message, args) {
        var url = `https://codeforces.com/problemset/problem/${args[0]}/${args[1]}`

        message.channel.send(url)
    }
};
