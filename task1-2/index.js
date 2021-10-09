// eslint-disable-next-line @typescript-eslint/no-var-requires
const readline = require('readline');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const csv = require('csvtojson');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tips = require('./tips');
const inputPath = path.join(__dirname, '../cvs/nodejs-hw1-ex1.csv');
const outputPath = path.join(__dirname, '../cvs/nodejs-hw1-ex2.txt');

/**
 * Read the content of csv file by node
 */
const readCSV = () => {
    fs.readFile(inputPath, (data, err) => {
        const table = [];
        if (err) {
            tips.error(err);
            return;
        }
        data = data.toString();
        let rows = [];
        rows = data.split('\r\n');
        for (let i = 0; i < rows.length; i++) {
            table.push(rows[i].split(','));
        }
    });
};

/**
 * load all the content of the csv file into RAM via stream
 */
const transformCSVToTxt = () => {
    csv().fromFile(inputPath).then((json) => {
        let txt = '';
        Array.from(json, (item, index) => {
            txt += JSON.stringify(item) + (json.length - 1 === index ? '' : '\r\n');
        });
        fs.writeFile(outputPath, txt, (err) => {
            if (err) {
                tips.error(err);
                return;
            }
        });
        tips.success('transform', txt);
    });
};

/**
 * load the content of the csv file line by line
 */
const transformCSVToTxtByline = () => {
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);
    const rl = readline.createInterface({
        input,
        output
    });
    const arr = [];
    rl.on('line', (line) => {
        arr.push(line.split(','));
    });
    rl.on('close', () => {
        const [titleArr, ...contentArr] = arr;
        contentArr.map((item, num) => {
            const book = {};
            titleArr.map((obj, index) => {
                book[obj] = item[index];
            });
            output.write(JSON.stringify(book) + (contentArr.length <= num + 1 ? '' : '\r\n'));
            return book;
        });
    });
};


// transformCSVToTxt();
transformCSVToTxtByline();
