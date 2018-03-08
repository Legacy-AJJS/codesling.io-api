import { writeFile } from 'fs';
import { execFile } from 'child_process';
import express from 'express';
import bodyParser from 'body-parser';
import tmp from 'tmp';
import cors from 'cors';

import axios from 'axios';

// import vm from 'vm';

import { success } from './lib/log';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-code', async (req, res) => {
  // Get test cases
  const tests = await axios.get(`http://localhost:3396/api/testCases/8`);

  tmp.file({ postfix: '.js' }, (errCreatingTmpFile, path) => {
    writeFile(path, `${req.body.code}\n${tests.data.content}`, (errWritingFile) => {
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
