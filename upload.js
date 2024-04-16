const fs = require('fs');
const path = require('path');
const prompt = require('prompt');
const { Dropbox } = require('dropbox'); // eslint-disable-line import/no-unresolved

prompt.start();

prompt.get({
  properties: {
    accessToken: {
      description: 'Please enter an API V2 access token',
    },
  },
}, (error, result) => {
  console.log('accessToken: ', result.accessToken)
  const dbx = new Dropbox({ accessToken: result.accessToken });
  prompt.get({
    properties: {
      fileToUpload: {
        description: 'enter the path to a local file to upload: ',
      },
    },
  }, (error, result) => {
    const localFile = result.fileToUpload;
    console.log('fileToUpload', localFile)
    console.log('actual file:', `${process.cwd()}/${localFile}`)
    fs.readFile(`${process.cwd()}/${localFile}`, (err, contents) => {
      if (err) {
        console.log('Error: ', err);
      }

      const baseName = `/${path.basename(localFile)}`;

      dbx.filesDelete({ path: baseName }).then((response) => {
          console.log(response);
      }).catch((uploadErr) => {
          console.log(uploadErr);
      });

      dbx.filesUpload({ path: baseName, contents }).then((response) => {
        console.log(response);
      }).catch((uploadErr) => {
        console.log(uploadErr);
      });
    });
  });
});
