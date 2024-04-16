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
  const dbx = new Dropbox({ accessToken: result.accessToken });
  prompt.get({
    properties: {
      fileToDelete: {
        description: 'enter the full file (or directory) path on your dropbox to delete: ',
      },
    },
  }, (error, result) => {
    const delPath = (result.fileToDelete[0] == '/' ? '' : '/') + result.fileToDelete;

    dbx.filesDelete({ "path" : delPath}).then((response) => {
        console.log(response);
    }).catch((uploadErr) => {
        console.log(uploadErr);
    });
  });
});


