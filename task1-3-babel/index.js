'use strict';

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _csvtojson = require('csvtojson');

var _csvtojson2 = _interopRequireDefault(_csvtojson);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _tips = require('./tips');

var _tips2 = _interopRequireDefault(_tips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputPath = _path2.default.join(__dirname, '../cvs/nodejs-hw1-ex1.csv');
var outputPath = _path2.default.join(__dirname, '../cvs/nodejs-hw1-ex2.txt');

/**
 * Read the content of csv file by node
 */
var readCSV = function readCSV() {
  _fs2.default.readFile(inputPath, function (data, err) {
    var table = [];
    if (err) {
      _tips2.default.error(err);
      return;
    }
    data = data.toString();
    var rows = [];
    rows = data.split('\r\n');
    for (var i = 0; i < rows.length; i++) {
      table.push(rows[i].split(','));
    }
  });
};

/**
 * load all the content of the csv file into RAM via stream
 */
var transformCSVToTxt = function transformCSVToTxt() {
  (0, _csvtojson2.default)().fromFile(inputPath).then(function (json) {
    var txt = '';
    Array.from(json, function (item, index) {
      txt += JSON.stringify(item) + (json.length - 1 === index ? '' : '\r\n');
    });
    _fs2.default.writeFile(outputPath, txt, function (err) {
      if (err) {
        _tips2.default.error(err);
        return;
      }
    });
    _tips2.default.success('transform', txt);
  });
};

/**
 * load the content of the csv file line by line
 */
var transformCSVToTxtByline = function transformCSVToTxtByline() {
  var input = _fs2.default.createReadStream(inputPath);
  var output = _fs2.default.createWriteStream(outputPath);
  var rl = _readline2.default.createInterface({
    input: input,
    output: output
  });
  var titleArr = [];
  var contentArr = [];
  var flag = true;
  rl.on('line', function (line) {
    var book = {};
    if (flag) {
      titleArr = line.split(',');
    } else {
      contentArr = line.split(',');
      titleArr.forEach(function (item, index) {
        book[item] = contentArr[index];
      });
      output.write(JSON.stringify(book) + ' \r\n');
    }
    flag = false;
  });
};

// transformCSVToTxt();
transformCSVToTxtByline();