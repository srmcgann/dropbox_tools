const fs = require('fs');
const prompt = require('prompt');
const { Dropbox } = require('dropbox'); // eslint-disable-line import/no-unresolved

prompt.start();

prompt.get({
  properties: {
    accessToken: {
      description: 'Please enter an API V2 access token',
    }
  },
}, (error, result) => {
  const dbx = new Dropbox({ accessToken: result.accessToken });
  prompt.get({
    properties: {
      fileToDownload: {
        description: 'enter the path of a file in your dropbox to download: ',
      },
    },
  }, (error, result) => {
    const remoteFile = result.fileToDownload;
    dbx.filesDownload({ path: remoteFile }).then((data) => {
      fs.writeFile(data.result.name, data.result.fileBinary, 'binary', (err) => {
        if (err) { throw err; }
        console.log(`File: ${data.result.name} saved.`);
      });
    })
    .catch((err) => {
      throw err;
    });
  });
});
