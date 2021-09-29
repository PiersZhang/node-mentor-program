const readLine = require('readline');

const readline = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'please input: '
}).on('line', function (line) {
    console.log('reverse string is: ' + line.split('').reverse().join(''))
    readline.prompt();
});

readline.prompt();