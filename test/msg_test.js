"use strict"

const fs = require('fs');
const { createClient, segment } = require("icqq");
require("dotenv").config();
const xml2js = require('xml2js');

const account = parseInt(process.env.qq);
const password = process.env.password;
const config = {
    // trace,debug,info,warn,error,mark
    log_level: "info",
    // 1:Android Phone 2:aPad 3:Android Watch 4:MacOS 5:iPad
    platform: 3,
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

client.on("system.online", () => console.log("Service is now online!"));

client.login(account, password)

process.on("unhandledRejection", (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason)
});

client.on("message.private", (event) => {
    const sender = event.sender;
    const message = [segment.xml(build_xml_msg())];
    event.reply(message);
});

function build_weather_xml_msg(data) {

    const xml_data = {
        msg: {
            '$': {
                flag: '1',
                serviceID: '1',
                brief: '卡片简介',
                templateID: '1',
                action: 'web',
                url: 'https://github.com/iHe1u0/chat_qq'
            },
            item: [{
                '$': { layout: '0' },
                title: 'layout="0"',
                summary: 'title,summary,picture各占一行均可重复使用，按照Element顺序显示',
                picture: [{ '$': { cover: 'https://github.githubassets.com/favicons/favicon.svg' } }]
            }],
            source: {
                "$": {
                    // 底部来源App名字
                    name: "chat qq",
                    // App的Icon
                    icon: "https://github.githubassets.com/favicons/favicon.svg",
                    // 点击后跳转的链接
                    url: "https://github.com/iHe1u0/chat_qq",
                    action: "web",
                    appid: "-1"
                }
            }
        }
    };

    var builder = new xml2js.Builder();
    var xml = builder.buildObject(xml_data);

    return xml;
}