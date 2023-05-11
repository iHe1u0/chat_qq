const openai = require('openai');
const readline = require('readline');
const fs = require('fs');

require("dotenv").config();

// 设置必要的环境变量
const API_KEY = process.env.OPENAI_API_KEY;
const BASE_PATH = process.env.BASE_PATH.replace(/\/+$/, "");

let history = [];

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function chat_data(uid) {
    const path = `./data/chat/${uid}.json`;
    if (!fs.existsSync('./data/chat')) {
        fs.mkdirSync('./data/chat');
    }
    return path;
}

function readHistory(uid) {
    const file_path = chat_data(uid);
    if (fs.existsSync(file_path)) {
        try {
            const jsonString = fs.readFileSync(file_path, 'utf8');
            history = JSON.parse(jsonString);
        } catch (err) {
            console.error(err);
        }
    }
}

function saveHistory(uid) {
    const file_path = chat_data(uid);
    try {
        const jsonString = JSON.stringify(history);
        fs.writeFileSync(file_path, jsonString, 'utf8');
    } catch (err) {
        console.error(err);
    }
}

function askQuestion(uid) {

    const system_role = { "role": "system", "content": "" };
    const user_role = { "role": "user", "content": "" };
    const assistant_role = { "role": "assistant", "content": "" };

    input.question('Input: ', (value) => {
        let fake_answer = "answered:" + value;

        user_role.content = value;
        assistant_role.content = fake_answer;

        history.push(user_role);
        history.push(assistant_role);

        if (value === 'q') {
            saveHistory(uid);
            input.close();
        } else {
            askQuestion(uid);
        }
    });
    console.log(history);
    saveHistory(uid);
}

const uid = 1000;
readHistory(uid);
askQuestion(uid);
