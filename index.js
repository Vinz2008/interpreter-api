// my files
const python = require('./python');
const c = require('./c');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;;
const cors = require('cors');
app.use(cors({origin: '*'}))
app.use(bodyParser.json());
const { stdout, stderr } = require("process");
const { send } = require('express/lib/response');
global.output = ""


var code = "";
var language = "";
app.post('/input', async (req, res) => {
language = req.body.language;
code = req.body.code;
console.log(`code: ${code}`);
console.log(`language: ${language}`);

if (language == "c") {
    c.run(code).then((output) => {
        var function_output = output
        console.log(`output : ${output}`)
        console.log(`function_output : ${function_output}`)
        res.status(200).send(function_output)
    });
} else if (language == "python") {
    python.run(code).then((output) => {
        var function_output = output
        console.log(`output : ${output}`)
        console.log(`function_output : ${function_output}`)
        res.status(200).send(function_output)
    });
}

});

app.listen(port, () => console.log(`Api input listening on port ${port}!`));

