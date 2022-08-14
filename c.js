const { exec } = require("child_process");
var fs = require('fs');
const Str = require('@supercharge/strings'); 


var randomId = "";
var fileName = "";
var output;

const run = (code) => {
    return new Promise(resolve => {
        reg1 = /'/g
        code = code.replace(reg1,'"');
        randomId = Str.random(50);
        fileName = "script-" + randomId + ".c";
        fileNameOutput = "output-c-" + randomId + ".bin";
        fs.writeFile(fileName,code, function (err) {
            if (err) throw err; {
                console.log("Error " + err);
            }
            console.log(`${fileName} created`);
            exec(`gcc ${fileName} -o ${fileNameOutput}`, (err, stdout, stderr) => {
                exec(`./${fileNameOutput}`, (err, stdout, stderr) => {
                    output = stdout;
                    console.log(`${fileName} executed`);
                    console.log("output after exec : " + output);
                    fs.unlink(fileName, (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log(`File ${fileName} is deleted.`);
                        fs.unlink(fileNameOutput, (err) => {
                            if (err) {
                                throw err;
                            }
                            console.log(`File ${fileNameOutput} is deleted.`);
                            resolve(output);
                        });
                    });
                });
            });
        });
        
    });
};


module.exports = { run };