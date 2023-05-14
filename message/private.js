"use strict"

const { replyTextMessage } = require("../ai/openai_api");
const { client } = require("../app");

client.on("message.private", (event) => {
    let raw_message = "";
    let sender = event.sender.user_id;
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
    replyTextMessage(sender, raw_message).then(reply_message => {
        event.reply(reply_message);
    });
})
