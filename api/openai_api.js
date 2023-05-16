const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
require("dotenv").config();

const default_system_role = process.env.system_role || "";
const clear_key = (process.env.clear_keywords || '清空,早安,午安,晚安').split(",");
const openai_api_key = process.env.openai_api_key;
const base_path = process.env.base_path || "https://api.openai.com/v1";
const model = process.env.model || 'gpt-3.5-turbo';
let temperature = parseFloat(process.env.temperature) || 1.0;
let max_token = parseInt(process.env.max_token) || 2048;
if (temperature > 2.0 || temperature < 0.0) {
    temperature = 1.0;
}
if (max_token <= 0) {
    max_token = 2048;
}

function chat_data(uid) {
    const path = `./data/chat/${uid}.json`;
    if (!fs.existsSync('./data/chat')) {
        fs.mkdirSync('./data/chat');
    }
    return path;
}

function read_history(uid) {
    const file_path = chat_data(uid);
    if (fs.existsSync(file_path)) {
        try {
            const jsonString = fs.readFileSync(file_path, 'utf8');
            return JSON.parse(jsonString);
        } catch (err) {
            console.error(err);
        }
    }
    return [];
}

function save_history(uid, history) {
    const file_path = chat_data(uid);
    try {
        const jsonString = JSON.stringify(history);
        fs.writeFileSync(file_path, jsonString, 'utf8');
    } catch (err) {
        console.error(err);
    }
}

function delete_history(uid) {
    try {
        fs.unlinkSync(chat_data(uid));
    } catch (error) {
        console.warn(error);
    }
}

async function reply_normal_message(uid = 10000, received_message = "") {
    let history = [];
    history = read_history(uid);
    const configuration = new Configuration({
        apiKey: openai_api_key,
        basePath: base_path.replace(/\/+$/, ""),
    });
    const openai = new OpenAIApi(configuration);

    const system_role = { "role": "system", "content": default_system_role };
    const user_role = { "role": "user", "content": "" };
    const assistant_role = { "role": "assistant", "content": "" };

    user_role.content = received_message;

    const messages = [];
    messages.push(system_role);
    if (history) {
        history.forEach(function (item) {
            messages.push({ role: item.role, content: item.content });
        });
    }
    messages.push(user_role);
    try {
        const completion = await openai.createChatCompletion({
            model: model,
            messages: messages,
            // max_tokens: max_token,
            temperature: temperature,
            presence_penalty: 2.0,
        });
        const reply_message = completion.data.choices[0].message.content;
        assistant_role.content = reply_message;

        history.push(user_role);
        history.push(assistant_role);
        save_history(uid, history);

        return reply_message;
    } catch (error) {
        delete_history(uid);
        if (error.response) {
            console.error(error.response.data);
            if (error.response.data.error.message) {
                return error.response.data.error.message;
            }
        } else {
            console.error(error.message);
        }
        return error.message;
    } finally {
        if (clear_key.includes(received_message.trim())) {
            delete_history(uid);
        }
    }
}

module.exports = { reply_normal_message: reply_normal_message };
