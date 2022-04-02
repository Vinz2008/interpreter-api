const Str = require('@supercharge/strings') 
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require("child_process");
const app = express();
const port = process.env.PORT || 8000;;
const cors = require('cors');
app.use(cors({origin: '*'}))
app.use(bodyParser.json())
/*app.use((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  });

*/
var output;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
var fs = require('fs');
var randomId = "";
var fileName = "";
const { stdout, stderr } = require("process");
const { send } = require('express/lib/response');
global.output = ""
const run_two =  (code) => {
    return new Promise(resolve => {
        randomId = Str.random(50);
        fileName = "script-" + randomId + ".py"    
        fs.writeFile(fileName,code, function (err) {
            if (err) throw err; {
                console.log("Error " + err);
            }
            console.log(`${fileName} created`)
            exec(`python3 ${fileName}`, (err, stdout, stderr) => {
                output = stdout
                console.log(`${fileName} executed`)
                console.log("output after exec : " + output)
                fs.unlink(fileName, (err) => {
                    if (err) {
                        throw err;
                    }
            
                    console.log(`File ${fileName} is deleted.`);
                    resolve(output);
                });
            });
        })
      
        
        
    })
}

async function run(code) {
    randomId = Str.random(50);
    fileName = "script-" + randomId + ".py"    
    fs.writeFile(fileName,code, function (err) {
        if (err) throw err; {
            console.log("Error " + err);
    }
        console.log(`${fileName} created`)
        exec(`python3 ${fileName}`, (err, stdout, stderr) => {
            output = stdout
            console.log(`${fileName} executed`)
            console.log("output after exec : " + output)
            fs.unlink(fileName, (err) => {
                if (err) {
                    throw err;
                }
            
                console.log(`File ${fileName} is deleted.`);
            });
    });
    //console.log(`output out of exec : ${output}`)
    /*exec(`python3 ${fileName}`, (err, stdout, stderr) => {
        output = stdout
        console.log(`${fileName} executed`)
        console.log(output)*/
        /* app.get('/output', (req, res) => res.send(output));
        app.listen(port, () => console.log(`Api output listening on port ${port}!`));
*/

    //return output
    })
    //console.log(`output out of write file : ${output}`)
    /*fs.unlink(fileName, (err) => {
        if (err) {
            throw err;
        }
    
        console.log(`File ${fileName} is deleted.`);
    });*/
    /*console.log("output returned : " + output)*/
}

var code = ""
app.post('/input', async (req, res) => {
    /*res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");*/
code = req.body.code;
console.log(`code: ${code}`)
run_two(code).then((output) => {
    var function_output = output
    console.log(`output : ${output}`)
    console.log(`function_output : ${function_output}`)
    res.status(200).send(function_output)
})

//console.log("output :" + output)
//res.status(200).send(output)

/*app.get('/output', (req, res) => res.send(run(code)));*/

});

app.listen(port, () => console.log(`Api input listening on port ${port}!`));

