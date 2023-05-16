"use strict"

const { reply_normal_message: reply_normal_message } = require("../api/openai_api");
const { update } = require("../api/update_api");
const { reply_weather } = require("../api/weather_api");
const { client } = require("../app");
require('dotenv').config();

const commander = process.env.commander || "";
const is_private_on = process.env.private ? (process.env.private === 'true' ? true : false) : true;
const is_wather_on = process.env.weather ? (process.env.weather === 'true' ? true : false) : false;

client.on("message.private", (event) => {
    if (!is_private_on) {
        return;
    }
    let raw_message = "";
    const sender = event.sender.user_id;
    event.message.forEach(message => {
        const message_type = message.type;
        switch (message_type) {
            case "text":
            case "face":
            case "bface":
                let text = message.text;
                if (text.endsWith("请使用最新版手机QQ体验新功能")) {
                    text = text.replace("请使用最新版手机QQ体验新功能", "");
                }
                raw_message += text;
                break;
            case "flash":
                raw_message += ".";
            case "file":
            case "record":
            case "json":
            case "image":
            default:
                break;
        }
    });
    if (raw_message.length == 0) {
        event.reply(event.message, false);
        return;
    }
    if (raw_message.startsWith("#")) {
        let command = raw_message.replace("#", "").trim();
        if (command.endsWith("天气") && is_wather_on) {
            reply_weather(command.replace("天气", ""), event);
            return;
        } else if (command === "更新" && sender == commander.trim()) {
            update(event);
            return;
        }
    }
    reply_normal_message(sender, raw_message).then(reply_message => {
        event.reply(reply_message);
    });
})
