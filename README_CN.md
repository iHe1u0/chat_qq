# chat_qq

这是一个适用于 QQ 的示例 chatgpt 工具。

## 如何使用

- 克隆这个仓库到本地或者你的服务器上。

- 在项目根路径运行 `npm install oicq dotenv --save`。

- 创建 `.env` 文件，内容设置如下：
    ```
    openai_api_key=sk-xxxxxxxxxxxxxxxxxxxx
    base_path="https://api.openai.com/v1"
    qq=1234567890
    password=**********
    ```

- 运行 `npm run dev` 并解决依赖问题。

- 扫描二维码并登录。
