"use strict"

const { replyTextMessage } = require("../ai/openai_api");
const { client } = require("../app");

// personal message
client.on("message.private", (event) => {
    let messages = "";
    let sender = event.sender.user_id;
    event.message.forEach(message => {
        if (message.type == "text") {
            let text = message.text;
            if (text.endsWith("请使用最新版手机QQ体验新功能")) {
                text = text.replace("请使用最新版手机QQ体验新功能", "");
            }
            messages += text;
        }
    });
    if (messages.length == 0) {
        event.reply(event.message, false);
        return;
    }
    replyTextMessage(sender, messages).then(reply_message => {
        event.reply(reply_message);
    });
})

// group message
client.on("message.group", (event) => {

})
