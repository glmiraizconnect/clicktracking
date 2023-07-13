#  _src folder: You should modify files in _src. run the below commands will generate files in _dist and _site. 
#  _dist folder: the files are from Clasp for Google Apps Script.
#  _site folder: these files should be posted onto static server.
#
npx tsc ./_src/redir.ts --outFile ./_site/redir.js

npx tsc ./_src/clickapp_gas.ts --outFile ./_dist/clickapp_gas.gs

cp ./_src/redir.html ./_site/
