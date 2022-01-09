const express = require('express');
const bodyParser = require('body-parser');
import cors from 'cors';
const { exec } = require("child_process");
const app = express();
const port = process.env.PORT || 8000;;
app.use(bodyParser.json())
app.use(cors({ origin: true }))

var fs = require('fs');
const { stdout, stderr } = require("process");
global.output = ""
function run(code) {
    fs.writeFile('script.py',code, function (err) {
        if (err) throw err; {
            console.log("");
    }});
    exec("python3 script.py", (err, stdout, stderr) => {
        output = stdout
        console.log(output)
        /* app.get('/output', (req, res) => res.send(output));
        app.listen(port, () => console.log(`Api output listening on port ${port}!`));
*/

    //return output
    })
    return output
}
var code = ""
app.post('/input', (req, res) => {
code = req.body.code;
console.log(run(code))
res.send(run(code))

/*app.get('/output', (req, res) => res.send(run(code)));*/

});

app.listen(port, () => console.log(`Api input listening on port ${port}!`));
