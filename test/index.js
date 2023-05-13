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
