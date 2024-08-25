"use strict"

require("dotenv").config();

const { createOpenAPI, createWebsocket } = require('qq-guild-bot');



const app_id = process.env.app_id;
const app_token = process.env.app_token;

const client_config = {
    appID: app_id, // 申请机器人时获取到的机器人 BotAppID
    token: app_token, // 申请机器人时获取到的机器人 BotToken
    // intents: ['PUBLIC_GUILD_MESSAGES'], // 事件订阅,用于开启可接收的消息类型
    sandbox: true, // 沙箱支持，可选，默认false. v2.7.0+
};

const ws_config = {
    appID: app_id, // 申请机器人时获取到的机器人 BotAppID
    token: app_token, // 申请机器人时获取到的机器人 BotToken
    // intents: ['PUBLIC_GUILD_MESSAGES'], // 事件订阅,用于开启可接收的消息类型
    sandbox: true, // 沙箱支持，可选，默认false. v2.7.0+
    maxRetry: 1,
};

// 创建 client
const client = createOpenAPI(client_config);

// 创建 websocket 连接
const ws = createWebsocket(ws_config);


ws.on('READY', (wsdata) => {
    console.log('[READY] 事件接收 :', wsdata);
    // 659937385
    // let { data } = client.guildApi.guildMembers('659937385');
    client.channelApi.channel('659937385').then(res => {
        console.log(res.data);
    });

    // client.messageApi
    //     .postMessage('659937385', {
    //         content: 'messageApi接口触发:hello',
    //     })
    //     .then(res => {
    //         // 数据存储在data中
    //         console.log(res.data);
    //     })
    //     .catch(err => {
    //         // err信息错误码请参考API文档错误码描述
    //         console.log(err);
    //     });
});

ws.on('ERROR', (data) => {
    console.log('[ERROR] 事件接收 :', data);
});
ws.on('GUILDS', (data) => {
    console.log('[GUILDS] 事件接收 :', data);
});
ws.on('GUILD_MEMBERS', (data) => {
    console.log('[GUILD_MEMBERS] 事件接收 :', data);
});
ws.on('GUILD_MESSAGES', (data) => {
    console.log('[GUILD_MESSAGES] 事件接收 :', data);
});
ws.on('GUILD_MESSAGE_REACTIONS', (data) => {
    console.log('[GUILD_MESSAGE_REACTIONS] 事件接收 :', data);
});
ws.on('DIRECT_MESSAGE', (data) => {
    console.log('[DIRECT_MESSAGE] 事件接收 :', data);
});
ws.on('INTERACTION', (data) => {
    console.log('[INTERACTION] 事件接收 :', data);
});
ws.on('MESSAGE_AUDIT', (data) => {
    console.log('[MESSAGE_AUDIT] 事件接收 :', data);
});
ws.on('FORUMS_EVENT', (data) => {
    console.log('[FORUMS_EVENT] 事件接收 :', data);
});
ws.on('AUDIO_ACTION', (data) => {
    console.log('[AUDIO_ACTION] 事件接收 :', data);
});
ws.on('PUBLIC_GUILD_MESSAGES', async (eventData) => {
    console.log('[PUBLIC_GUILD_MESSAGES] 事件接收 :', eventData);
    const { data } = await client.messageApi.postMessage('', {
        content: 'test'
    })
    console.log(data);
});