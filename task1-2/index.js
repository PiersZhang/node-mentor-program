const readline = require('readline');
const csv = require('csvtojson');
const path = require('path');
const fs = require("fs");

const tips = require('./tips');
const inputPath = path.join(__dirname, '../cvs/nodejs-hw1-ex1.csv');
const outputPath = path.join(__dirname, '../cvs/nodejs-hw1-ex2.txt');

/**
 * Read the content of csv file by node
 */
const readCSV = () => {
    fs.readFile(inputPath, function (data, err) {
        var table = new Array();
        if (err) {
            tips.error(err);
            return;
        }
        data = data.toString();
        var table = new Array();
        var rows = new Array();
        rows = data.split("\r\n");
        for (var i = 0; i < rows.length; i++) {
            table.push(rows[i].split(","));
        }
    });
}

/**
 * load all the content of the csv file into RAM via stream
 */
const transformCSVToTxt = () => {
    csv().fromFile(inputPath).then((json) => {
        let txt = '';
        Array.from(json, (item, index) => {
            txt += JSON.stringify(item) + (json.length - 1 === index ? '' : '\r\n');
        })
        fs.writeFile(outputPath, txt, (err) => {
            if (err) {
                tips.error(err);
                return;
            }
        })
        tips.success('transform', txt)
    })
}
/**
 * load the content of the csv file line by line
 */
const transformCSVToTxtByline = () => {
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);
    const rl = readline.createInterface({
        input: input,
        output: output,
    });
    let arr = [];
    rl.on('line', (line) => {
        arr.push(line.split(','));
    });
    rl.on('close', () => {
        let [ titleArr, ...contentArr] = arr;
        contentArr.map((item, num) => {
            let book = {};
            titleArr.map((obj, index) => {
                book[obj] = item[index];
            });
            output.write(JSON.stringify(book) + (contentArr.length <= num + 1 ? '' : '\r\n'));
            return book;
        });
    })
}


// transformCSVToTxt();
transformCSVToTxtByline();