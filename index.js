const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require("child_process");
const app = express();
const port = 80;


var fs = require('fs');
const { stdout, stderr } = require("process");
function run(code) {
fs.writeFile('script.py',code, function (err) {
    if (err) throw err; {
    console.log("");
    }});
exec("python3 script.py", (err, stdout, stderr) => {
    var output = stdout
    console.log(output)
   /* app.get('/output', (req, res) => res.send(output));
    app.listen(port, () => console.log(`Api output listening on port ${port}!`));
*/
    return output
})
}
var code = ""
app.post('/input', (req, res) => {
code = req.body.code;

app.get('/output', (req, res) => res.send(run(code)));

});

app.listen(port, () => console.log(`Api input listening on port ${port}!`));
