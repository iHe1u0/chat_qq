# chat_qq

English / [简体中文](./README.md)

- This project is based on the QQ bot of chatgpt. **在不受支持的地区部署的话，注意需要使用一个反向代理绕过openai的检查**. For specific list, please refer to [Supported countries and territories](https://platformai.com/docs/supported-countries/supported-countries-and-territories) on the official website of OpenAI.

- You can also use an idle phone/computer/tablet to run this project. It is recommended to use the open source software [Termux](https://github.com/termux/termux-app) for Android devices. I recommend using the one I compiled [Termux](https://imorning.lanzouy.com/b071a31ng), with download password: 3vxm. Compared to the original version, it can display QR codes better. Please search for tutorials on how to change sources, install Node.js, and git for Term yourself.

- Due to Tencent's interface limitations, the user needs to scan the verification code for the first login, but can then log in directly using a token.

## How to Use

1. Configure the `git` and `Node.js` environments.

2. Clone this project to your local computer or server:

```bash
    git clone https://github.com/morningos/chat_qq
```

3. Run `npm install` in the root path of the project to install related dependencies.

4. Create a `.env` file with the following content:

```ini
    # QQ account (required)
    qq=xxxxxxx
    # Password (required)
    password=xxxxxxxx
    # Openai Key (required)
    openai_api_key=sk-xxxxxxxxxxxx
    # Reverse Proxy, if not set, will be default(https://api.openai.com/v1). 
    # It is suggested that you should change it to your own reverse proxy.
    # This (reverse proxy) must be set up in unsupported countries or regions
    base_path="https://api.openai.com/v1"
    # The model used, defaults to gpt-3.5-turbo.
    model=gpt-3.5-turbo
    # Maximum tokens for continuous conversation, defaults to 204(unused)
    max_token=2048
    # Temperature value between 0.0 and 2.0, higher values are more creative.
    temperature=2.0
    # Clear Keywords (reset the keywords of the dialogue, separate multiple keywords with commas)
    clear_keywords="清空,再见,早安,午安,晚安"
    # Set a default rule
    system_role=""
    # Whether to open private message reply(default is on,set true to trun on and false is off)
    private=true
    # Whether to open group message reply(default is off)
    group=true
```

5. Run `npm run dev`.

6. If this is the first-time login, you need to scan the code to log in. Subsequently, token login will be used by caching locally. As long as you do not modify the 'devices.json' file under the data directory or change the, in theory, the token will remain valid permanently.

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