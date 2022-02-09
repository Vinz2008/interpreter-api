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
var fs = require('fs');
var randomId = "";
var fileName = "";
const { stdout, stderr } = require("process");
const { send } = require('express/lib/response');
global.output = ""
function run(code) {
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
    /*exec(`python3 ${fileName}`, (err, stdout, stderr) => {
        output = stdout
        console.log(`${fileName} executed`)
        console.log(output)*/
        /* app.get('/output', (req, res) => res.send(output));
        app.listen(port, () => console.log(`Api output listening on port ${port}!`));
*/

    //return output
    })
    /*fs.unlink(fileName, (err) => {
        if (err) {
            throw err;
        }
    
        console.log(`File ${fileName} is deleted.`);
    });*/
    /*console.log("output returned : " + output)*/
    return output
}

var code = ""
app.post('/input', async (req, res) => {
    /*res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");*/
code = req.body.code;
console.log(`code: ${code}`)
var function_output = run(code)

console.log(function_output)
res.status(200).send(function_output)
//console.log("output :" + output)
//res.status(200).send(output)

/*app.get('/output', (req, res) => res.send(run(code)));*/

});

app.listen(port, () => console.log(`Api input listening on port ${port}!`));

