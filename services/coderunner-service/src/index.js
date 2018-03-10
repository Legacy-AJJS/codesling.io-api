import { writeFile } from 'fs';
import { execFile } from 'child_process';
import express from 'express';
import bodyParser from 'body-parser';
import tmp from 'tmp';
import cors from 'cors';

import axios from 'axios';

// import vm from 'vm';

import { success } from './lib/log';

// Evalute true if passes test
const ifEqual = (testcases) =>
  testcases.reduce((acc, [input, output]) => {
    return acc + `\n
    if (hello(${input}) === ${output}) {
      console.log('SUCCESS');
    } else {
      console.log('FAILURE');
    }`
  }, '')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-code', async (req, res) => {
  // Get test cases
  const tests = await axios.get(`http://localhost:3396/api/testCases/${req.body.id}`);
  const parsed = JSON.parse(tests.data.content);
  const testcases = Object.entries(parsed);
  tmp.file({ postfix: '.js' }, (errCreatingTmpFile, path) => {
    writeFile(path, `${req.body.code}\n${ifEqual(testcases)}`, (errWritingFile) => {
      if (errWritingFile) {
        res.send(errWritingFile);
      } else {
        execFile('node', [path], (errExecutingFile, stdout, stderr) => {
          if (errExecutingFile) {
            let stderrFormatted = stderr.split('\n');
            stderrFormatted.shift();
            stderrFormatted = stderrFormatted.join('\n');
            res.send(stderrFormatted);
          } else {
            res.write(JSON.stringify(stdout));
            res.send();
          }
        });
      }
    });
  });
});

app.listen(PORT, success(`coderunner-service is listening on port ${PORT}`));
