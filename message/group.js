"use strict"

// const { replyTextMessage } = require("../ai/openai_api");
const { client } = require("../app");

client.on("message.group", (event) => {
    let isAtMe = event.atme;
    console.log(isAtMe);
})