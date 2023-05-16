const { exec } = require("child_process");
require('dotenv').config();

function execute(command) {
    return new Promise((resolve, reject) => {
        // 使用Promise对象进行封装处理
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`执行错误: ${error.message}`);
                reject(error);
            }
            if (stderr) {
                console.log(`stderr报错: ${stderr}`);
                reject(stderr);
            }
            // console.log(`stdout信息: ${stdout}`);
            resolve(stdout.trim()); // 将stdout内容去除空格后reslove出去
        });
    });
}

async function update(event) {
    const update_command = "git pull --rebase";
    const restart_comman = "pm2 reload all";
    event.reply(update_command);
    try {
        execute(update_command).then((result) => {
            console.log(result);
            event.reply(result);
            execute(restart_comman).then((final_result) => {
                console.log(final_result);
                event.reply(final_result);
            });
        });
    } catch (err) {
        event.reply(err);
        throw err;
    }
}

module.exports = { update };
