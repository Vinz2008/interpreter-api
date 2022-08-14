const { exec } = require("child_process");
var fs = require('fs');
const Str = require('@supercharge/strings'); 


var randomId = "";
var fileName = "";
var output;

const run = (code) => {
    return new Promise(resolve => {
        randomId = Str.random(50);
        fileName = "script-" + randomId + ".py";    
        fs.writeFile(fileName,code, function (err) {
            if (err) throw err; {
                console.log("Error " + err);
            }
            console.log(`${fileName} created`);
            exec(`python3 ${fileName}`, (err, stdout, stderr) => {
                output = stdout;
                console.log(`${fileName} executed`);
                console.log("output after exec : " + output);
                fs.unlink(fileName, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log(`File ${fileName} is deleted.`);
                    resolve(output);
                });
            });
        });
    });
};

module.exports = { run };