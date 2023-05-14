# chat_qq

English / [简体中文](./README.md)

- This project is based on the QQ robot of chatgpt. In the domestic environment, it is necessary to use a reverse proxy to bypass OpenAI's check. The specific list can be found on the official website of OpenAI: [Supported countries and territories](https://platform.openai.com/docs/supported-countries/supported-countries-and-territories).

- You can also use an idle mobile phone/computer/tablet to run this project. For Android devices, it is recommended to use the open-source software [Termux](https://github.com/termux/termux-app). Here is a download link for Termux that has been compiled in advance: [Lanzou Cloud](https://imorning.lanzouy.com/b071a31ng) Password: 3vxm. Please search for tutorials on how to change sources, install Node.js, and Git for Termux.

- Due to Tencent's interface, first-time login requires scanning code verification. Subsequently, you can directly log in using a token.

## How to Use
1. Clone this project to your local or server.
2. Run `npm install` at the root path of the project.
3. Create `.env` file with the following content:
    ```ini
    qq=xxxxxxx
    password=xxxxxxxx
    # Openai Key
    openai_api_key=sk-xxxxxxxxxxxx
    # Reverse proxy, default (https://api.openai.com/v1) if not set
    base_path="https://api.openai.com/v1"
    # Model used by default as gpt-3.5-turbo
    model=gpt-3.5-turbo
    # Maximum number of tokens for continuous conversation, default as 2048(unused)
    max_token=2048
    # Temperature, value between 0~2, higher means more creativity
    temperature=2.0
    # Clear Keywords, multiple keywords separated by commas
    clear_keywords="清空,再见"
    # Set a default system role
    system_role=""
    ```
4. Run `npm run dev`.
5. If it is your first time logging in, you need to scan the code to log in. Subsequently, a cached token will be used for login until the token expires.


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