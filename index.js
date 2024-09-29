const { spawn } = require("child_process");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Ryuu Bot server is running on port ${port}`);
});

let botProcess = null;

const manageBotProcess = (script) => {
    if (botProcess) {
        botProcess.kill();
        console.log(`Terminated previous instance of ${script}.`);
    }

    botProcess = spawn("node", ["--trace-warnings", "--async-stack-traces", script], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    botProcess.on("close", (exitCode) => {
        console.log(`${script} terminated with code: ${exitCode}`);
    });

    botProcess.on("error", (error) => {
        console.error(`Error while starting ${script}: ${error.message}`);
    });
};

manageBotProcess("ryuu.js");