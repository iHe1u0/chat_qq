"use strict"

const fs = require('fs');
const path = require('path');
const { createClient } = require("icqq");
require("dotenv").config();

const account = parseInt(process.env.qq);
const password = process.env.password;
const config = {
    // trace,debug,info,warn,error,mark
    log_level: "info",
    // 1:Android Phone 2:aPad 3:Android Watch 4:MacOS 5:iPad
    platform: 3,
    // port
    port: 1124,
    // Cache users of group?
    reconn_interval: false
};
const client = createClient(config);

client.on('system.login.slider', (e) => {
    console.log('输入滑块地址获取的ticket后继续。\n滑块地址:    ' + e.url)
    process.stdin.once('data', (data) => {
        client.submitSlider(data.toString().trim());
    })
});

client.on('system.login.qrcode', (e) => {
    console.log('扫码完成后回车继续:')
    process.stdin.once('data', () => {
        client.login();
    })
});

client.on('system.login.device', (e) => {
    console.log('请选择验证方式:(1:短信验证   其他：扫码验证)')
    process.stdin.once('data', (data) => {
        if (data.toString().trim() === '1') {
            client.sendSmsCode()
            console.log('请输入手机收到的短信验证码:')
            process.stdin.once('data', (res) => {
                client.submitSmsCode(res.toString().trim());
            })
        } else {
            console.log('扫码完成后回车继续：' + e.url);
            process.stdin.once('data', () => {
                client.login();
            });
        }
    })
});

client.on("system.online", ()=>console.log("Service is now online!"));

client.login(account, password)

exports.client = client;

// Load message handler
const message_handler_dir = path.join(__dirname, 'message');
fs.readdirSync(message_handler_dir).forEach(file => {
    require(path.resolve(message_handler_dir, file));
});

// Openai API
require("./ai/openai_api");

process.on("unhandledRejection", (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason)
});
