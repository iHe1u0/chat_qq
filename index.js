"use strict"

// const { replyTextMessage } = require("./ai/openai_api");
// let msg=replyTextMessage("你好").then(r=>{
//     console.log(r)
// });
// console.log(msg);

const { createClient } = require("oicq")
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const account = process.env.QQ

let config = {
    log_level: "info",
    /** 1:安卓手机(默认) 2:aPad 3:安卓手表 4:MacOS 5:iPad */
    platform: 3
}

const client = createClient(account, config)

client
    .on("system.login.qrcode", function (e) {
        this.logger.mark("扫码后按Enter完成登录")
        process.stdin.once("data", () => {
            this.login()
        })
    })
    .login()

exports.client = client

require("./message/text")
require("./ai/openai_api")

process.on("unhandledRejection", (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})
