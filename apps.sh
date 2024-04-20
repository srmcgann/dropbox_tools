#!/bin/bash
cd ~
sudo ln -s ~/dropbox/download /usr/local/bin/download
sudo ln -s ~/dropbox/upload /usr/local/bin/upload
sudo ln -s ~/dropbox/delete /usr/local/bin/delete
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
export NVM_DIR="/usr/local/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install 16.20.2
nvm use 16.20.2

