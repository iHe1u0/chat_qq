"use strict"

const { replyTextMessage } = require("../ai/openai_api");
const { client } = require("../app");
require('dotenv').config();

const is_group_on = process.env.private ? (process.env.private === 'true' ? true : false) : false;

client.on("message.group", (event) => {
    if (!is_group_on) {
        return;
    }
    const is_at_me = event.atme;
    if (is_at_me) {
        const group_id = event.group_id;
        const sender = event.sender.user_id;
        let raw_message = "";
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
                case "at":
                default:
                    break;
            }
        });
        if (raw_message.length == 0) {
            event.reply(event.message, true);
            return;
        }
        replyTextMessage(group_id + "_" + sender, raw_message).then(reply_message => {
            event.reply(reply_message, true);
        });
    }
})