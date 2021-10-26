// eslint-disable-next-line @typescript-eslint/no-var-requires
const readLine = require('readline');

const readline = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'please input: '
}).on('line', (line) => {
  console.log(`reverse string is: ${  line.split('').reverse().join('')}`);
  readline.prompt();
});
readline.prompt();
