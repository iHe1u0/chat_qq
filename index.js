"use strict"

// const { replyTextMessage } = require("./ai/openai_api");
// let msg=replyTextMessage("你好").then(r=>{
//     console.log(r)
// });
// console.log(msg);

const { createClient } = require("oicq");
require("dotenv").config();
const account = process.env.QQ;

let config = {
    // trace,debug,info,warn,error,mark
    log_level: "info",
    // 1:安卓手机 2:aPad 3:安卓手表 4:MacOS 5:iPad
    platform: 3,
    // 端口
    port: 1124
};

const client = createClient(account, config);

// login with qr code
client
    .on("system.login.qrcode", function (e) {
        this.logger.mark("扫码后按Enter完成登录")
        process.stdin.once("data", () => {
            this.login();
        })
    })
    .login();

// login with password
// client.on("system.login.slider", function (e) {
//     console.log("输入ticket：")
//     process.stdin.once("data", ticket => this.submitSlider(String(ticket).trim()))
// }).login(process.env.password);

exports.client = client;

require("./message/text");
require("./ai/openai_api");

process.on("unhandledRejection", (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason)
});
