const fs = require('fs');
const readline = require('readline');
const request = require('request');
var myUrl = process.argv.slice(2);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(myUrl[0], (error, response, body) => {
  if (error !== null) {
    console.log('error:', error); // Print the error if one occurred
    rl.close();
  } else if (fs.existsSync(myUrl[1])) {
    rl.question('File exists. If you would like to overwrite the file enter "Y"', (answer) => {
      if (answer === 'Y') {
        fs.writeFile(myUrl[1], body, (err) => {
          if (err) throw err;
          console.log('Downloaded and saved ' + response.headers['content-length'] + ' bytes to ' + myUrl[1]);
          rl.close();
        });
      } else {
      rl.close();
      }
    });
  } else {
    fs.writeFile(myUrl[1], body, (err) => {
      if (err) throw err;
      console.log('Downloaded and saved ' + response.headers['content-length'] + ' bytes to ' + myUrl[1]);
      rl.close();
    });
  }
});