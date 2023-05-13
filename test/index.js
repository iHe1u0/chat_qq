const { OpenAIApi, Configuration } = require("openai");

require("dotenv").config();
const readlineSync = require('readline-sync');

const openai_api_key = process.env.openai_api_key;
const base_path = process.env.base_path || "https://api.openai.com/v1";
let max_token = parseInt(process.env.max_token) || 2048;
const model = process.env.model || 'gpt-3.5-turbo';
let temperature = parseFloat(process.env.temperature) || 1.0;

if (temperature > 2.0 || temperature < 0.0) {
    temperature = 1.0;
}
if (max_token <= 0) {
    max_token = 2048;
}

const configuration = new Configuration({
    apiKey: openai_api_key,
    basePath: base_path.replace(/\/+$/, ""),
});
const openai = new OpenAIApi(configuration);

async function main() {
    // const user_role = { "role": "user", "content": readlineSync.question("Input:") };
    const user_role = { "role": "user", "content": "" };
    user_role.content = "讲个50字的故事";
    const messages = [user_role];

    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
            max_tokens: 2000,
            temperature: temperature,
            presence_penalty: 2.0,
            stream: false,
            n: 3,
        });
        const reply_messages = completion.data.choices;
        reply_messages.forEach(item => {
            console.log(item.message.content);
        });
        // const reply_message = completion.data.choices[0].message.content;
        // console.log(completion.data);
        // console.log(reply_message);
    } catch (error) {
        console.log("error:" + error);
        if (error.response) {
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

async function listModels() {
    const response = await openai.listModels();
    const models = response.data.data;
    models.forEach(item => {
        // console.log(item.id + "---" + item.permission[0].allow_create_engine);
        console.log(item);
    });
    // for (let model in models) {
    //     console.log(model);
    // }
    // console.log(models);
    // console.log(response.data);
}

main();
// listModels();
