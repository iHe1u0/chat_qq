const { exec } = require("child_process");
require('dotenv').config();

function execute(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`执行错误: ${error.message}`);
                reject(error);
            }
            if (stderr) {
                console.log(`stderr报错: ${stderr}`);
                reject(stderr);
            }
            resolve(stdout.trim());
        });
    });
}

async function update(event) {
    const updateCommands = ["git pull --rebase", "npm install"];
    const restartCommand = "pm2 reload all";
    for (let i = 0; i < updateCommands.length; i++) {
        const command = updateCommands[i];
        try {
            const result = await execute(command);
            event.reply(result);
        } catch (err) {
            event.reply(err);
        }
    }
    try {
        const final_result = await execute(restartCommand);
        event.reply(final_result);
    } catch (err) {
        event.reply(err);
    }
}

module.exports = { update };
