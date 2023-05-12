# chat_qq

[English](./README.md) / 简体中文

- 本项目基于chatgpt的QQ机器人，在国内环境的话，注意需要使用一个反向代理绕过openai的检查，具体的名单可以参考openai官方网址：[Supported countries and territories](https://platform.openai.com/docs/supported-countries/supported-countries-and-territories)

- 你也可以使用一个闲置的手机/电脑/平板来运行本服务，Android设备推荐使用开源软件[Termux](https://github.com/termux/termux-app)，自己编译的下载地址：[蓝奏云](https://imorning.lanzouy.com/b071a31ng) 密码:3vxm


- 由于腾讯接口的原因，所以推荐使用扫码登录，注意需要在同一个ip下登录，后续尝试修改多种登陆方式。

## 如何使用

1. 将本项目克隆岛你本地或者你的服务器上。
2. 在项目根路径运行 `npm install oicq dotenv --save`。
3. 创建 `.env` 文件，内容设置如下：
    ```
    openai_api_key=sk-xxxxxxxxxxxxxxxxxxxx
    base_path="https://api.openai.com/v1"
    qq=1234567890
    password=**********
    ```
4. 运行 `npm run dev` 并解决依赖问题。
5. 扫描二维码后按照提示登录。
