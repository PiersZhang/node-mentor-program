import readline from 'readline';
import csv from 'csvtojson';
import path from 'path';
import fs from 'fs';

import tips from './tips';
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
  let titleArr = [];
  let contentArr = [];
  let flag = true;
  rl.on('line', (line) => {
    const book = {};
    if (flag) {
      titleArr = line.split(',');
    } else {
      contentArr = line.split(',');
      titleArr.forEach((item, index) => {
        book[item] = contentArr[index];
      });
      output.write(`${JSON.stringify(book)} \r\n`);
    }
    flag = false;
  });
};


// transformCSVToTxt();
transformCSVToTxtByline();
