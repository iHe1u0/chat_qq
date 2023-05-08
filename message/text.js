"use strict"

const { replyTextMessage } = require("../ai/openai_api");
const { client } = require("../index");

// personal message
client.on("message.private", (event) => {
    let messages = ""
    event.message.forEach(message => {
        if (message.type == "text") {
            messages += message.text;
        }
    });
    console.log("received message:" + messages);
    if (messages.length == 0) {
        event.reply(event.message, false);
        return;
    }
    replyTextMessage(messages).then(reply_message => {
        event.reply(reply_message);
    });
})

client.on("message.group", (event) => {

})
