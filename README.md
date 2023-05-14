# chat_qq

[English](./README_EN.md) / 简体中文

- 本项目基于chatgpt的QQ机器人，在国内环境的话，注意需要使用一个反向代理绕过openai的检查，具体的名单可以参考openai官方网址：[Supported countries and territories](https://platform.openai.com/docs/supported-countries/supported-countries-and-territories)

- 你也可以使用一个闲置的手机/电脑/平板来运行本项目，Android设备推荐使用开源软件[Termux](https://github.com/termux/termux-app)，这里提供一个已经编译好的Termux的下载地址：[蓝奏云](https://imorning.lanzouy.com/b071a31ng) 密码:3vxm，关于Termux的换源、安装nodejs、git的教程，请自行搜索。

- 由于腾讯接口的原因，首次登录需要扫码验证登录，后续可以直接使用token登录。

## 如何使用
1. 将本项目克隆岛你本地或者你的服务器上。
2. 在项目根路径运行 `npm install`。
3. 创建 `.env` 文件，内容设置如下：
    ```ini
    qq=xxxxxxx
    password=xxxxxxxx
    # Openai Key
    openai_api_key=sk-xxxxxxxxxxxx
    # 反向代理，不设置则为默认(https://api.openai.com/v1)
    base_path="https://api.openai.com/v1"
    # 使用的模型，默认为gpt-3.5-turbo
    model=gpt-3.5-turbo
    # 连续对话的最大token，默认为2048(未启用)
    max_token=2048
    # temperature，值在0~2之间，越高代表着更加有创造性
    temperature=2.0
    # Clear Keywords(重置对话的关键字，多个关键字中间使用英文逗号分开)
    clear_keywords="清空,再见,早安,午安,晚安"
    # 设置一个默认规则
    system_role=""
    # 是否打开私聊回复(默认开启, 开启:true  关闭:false)
    private=true
    # 是否打开群消息回复(默认关闭, 开启:true  关闭:false)
    group=true
    ```
4. 运行 `npm run dev`
5. 如果是第一次登录，则需要扫码登录，后续会使用缓存在本地的token登录，直到token失效。


## License
```
Copyright (c) 2023 iMorning

"Anti 996" License Version 1.0 (Draft)

Permission is hereby granted to any individual or legal entity
obtaining a copy of this licensed work (including the source code,
documentation and/or related items, hereinafter collectively referred
to as the "licensed work"), free of charge, to deal with the licensed
work for any purpose, including without limitation, the rights to use,
reproduce, modify, prepare derivative works of, distribute, publish
and sublicense the licensed work, subject to the following conditions:

1. The individual or the legal entity must conspicuously display,
without modification, this License and the notice on each redistributed
or derivative copy of the Licensed Work.

2. The individual or the legal entity must strictly comply with all
applicable laws, regulations, rules and standards of the jurisdiction
relating to labor and employment where the individual is physically
located or where the individual was born or naturalized; or where the
legal entity is registered or is operating (whichever is stricter). In
case that the jurisdiction has no such laws, regulations, rules and
standards or its laws, regulations, rules and standards are
unenforceable, the individual or the legal entity are required to
comply with Core International Labor Standards.

3. The individual or the legal entity shall not induce, suggest or force
its employee(s), whether full-time or part-time, or its independent
contractor(s), in any methods, to agree in oral or written form, to
directly or indirectly restrict, weaken or relinquish his or her
rights or remedies under such laws, regulations, rules and standards
relating to labor and employment as mentioned above, no matter whether
such written or oral agreements are enforceable under the laws of the
said jurisdiction, nor shall such individual or the legal entity
limit, in any methods, the rights of its employee(s) or independent
contractor(s) from reporting or complaining to the copyright holder or
relevant authorities monitoring the compliance of the license about
its violation(s) of the said license.

THE LICENSED WORK IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN ANY WAY CONNECTION WITH THE
LICENSED WORK OR THE USE OR OTHER DEALINGS IN THE LICENSED WORK.
```