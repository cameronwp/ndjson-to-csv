'use strict';

const csvWriter = require('csv-write-stream')
const fs = require('fs');
const ndjson = require('ndjson');

const args = process.argv.slice(2);

let inputFilePath = args[0];
let outputFilePath = args[1];

if (!inputFilePath || !outputFilePath) {
  console.error('Usage is:\n\nnode . path/to/input.txt path/to/output.csv');
  process.exit(1);
}

console.log(`Reading PouchDB dump from ${inputFilePath}`);

const writer = csvWriter({headers: [
  '_id',
  'pet',
  'petRemaining',
  'bestPetEstimate',
  'petMargin',
  'timelineMargin',
  'stepId',
  'channel',
  'type',
  'description',
  'action',
]})
writer.pipe(fs.createWriteStream(outputFilePath));

fs.createReadStream(inputFilePath)
  .pipe(ndjson.parse({strict: false}))
  .on('data', data => {
    const [key] = Object.keys(data);
    if (key === 'docs') {
      data[key].forEach(d => writer.write(d));
    }
  })
  .on('end', () => {
    writer.end();
    console.log(`Finished writing ${outputFilePath}`);
    process.exit(0);
  });
