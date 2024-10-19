![neko-status-plugin](https://socialify.git.ci/erzaozi/neko-status-plugin/image?description=1&font=Raleway&forks=1&issues=1&language=1&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Auto)

<img decoding="async" align=right src="resources/readme/girl.png" width="35%">

# NEKO-STATUS-PLUGIN 🍙

- 一个适用于 [Yunzai 系列机器人框架](https://github.com/yhArcadia/Yunzai-Bot-plugins-index) 的系统状态查询插件喵~

- 有着更加精简，美观和超超超超超可爱的 UI 和的风格，并且你可以自定义头图喵~

- **使用中遇到问题请加 QQ 群咨询：[707331865](https://qm.qq.com/q/TXTIS9KhO2)**

> [!TIP]
> 在看到 [Koishi](https://koishi.js.org/) 和 [Nonebot](https://nonebot.dev/) 类似风格的插件后，身为猫猫控我与 [CikeyQi](https://github.com/CikeyQi) 立马喜欢上了如此精美的设计，于是决定将这个插件移植到 Yunzai 上，并重新修改创作了模板加上了自定义头图，人家有的咱们也可以有喵~

## 安装插件

#### 1. 克隆仓库

```
git clone https://github.com/erzaozi/neko-status-plugin.git ./plugins/neko-status-plugin
```

> [!NOTE]
> 如果你的网络环境较差，无法连接到 Github，可以使用 [GitHub Proxy](https://mirror.ghproxy.com/) 提供的文件代理加速下载服务
>
> ```
> git clone https://mirror.ghproxy.com/https://github.com/erzaozi/neko-status-plugin.git ./plugins/neko-status-plugin
> ```

#### 2. 安装依赖

```
pnpm install --filter=neko-status-plugin
```

## 插件配置

> [!WARNING]
> 非常不建议手动修改配置文件，本插件已兼容 [Guoba-plugin](https://github.com/guoba-yunzai/guoba-plugin) ，请使用锅巴插件对配置项进行修改

## 功能列表

安装好后，请使用 `#状态` 或 `/status` 命令触发状态面板

- [x] CPU 占用
- [x] 内存占用
- [x] 网络上下行速率
- [x] 磁盘占用
- [x] 系统信息
- [x] GPU 型号
- [x] 插件数量
- [x] 适配器信息
- [x] 收发消息数量
- [x] 好友 & 群数量
- [x] 运行时间
- [x] [自定义展示](https://github.com/erzaozi/neko-status-plugin?tab=readme-ov-file#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B1%95%E7%A4%BA)

## 效果图

<img src="https://github.com/erzaozi/neko-status-plugin/assets/61369914/b606dc41-5c7c-4199-b3da-04d96be27370" height="500" alt="renderings"/>
<img src="https://github.com/erzaozi/neko-status-plugin/assets/61369914/cf0b837e-70fb-47e8-9805-5b1ed44f751c" height="500" alt="renderings"/>

## 自定义展示

如果你想自定义展示一些想看的内容，比如近期服务器负载情况，或服务器的 IP 地址等，可以按照以下步骤操作：

1. 在锅巴的本插件配置面板中，展开 `自定义内容` 配置项，点击 `新增` 按钮
   
2. 填写 `名称` 和 `命令`，`名称` 可以随意填写，`命令` 的填写可以参考以下是两个经典的例子：

   <details>
   <summary>展示服务器公网IP</summary>
   <br>

   要查看服务器的 IP 地址，可以使用 `hostname` 命令，该命令将返回所有网络接口的 IP 地址，以空格分隔：

   ```
   144.93.144.203 5DBD:1EE5:0D88:B35F:FB27:7218:1047:8408 F5B5:7345:111D:4E03:759F:FAAD:D2C0:B95F
   ```

   我们希望仅提取第一个 IP 地址。可以使用以下命令：

   **命令：**
   ```bash
   hostname -I | awk '{print $1}'
   ```

   **命令解析：**
   1. `hostname -I`：获取所有网络接口的 IP 地址，以空格分隔
   2. `awk '{print $1}'`：提取输出中的第一个 IP 地址

   </details>

   <details>
   <summary>展示服务器负载</summary>
   <br>

   使用 `uptime` 命令可以查看服务器的负载情况。该命令返回的内容类似于以下文本：

   ```
   16:31:32 up 5 days, 22:52, 4 users, load average: 0.02, 0.01, 0.00
   ```

   这样展示的内容较多，我们希望仅提取负载值，并将其转换为百分比形式。因此，可以使用以下命令：

   **命令：**
   ```bash
   uptime | awk -F'[:,]' '{printf "%.2f%% %.2f%% %.2f%%\n", ($8 * 100) / nproc, ($9 * 100) / nproc, ($10 * 100) / nproc}' nproc=$(nproc)
   ```

   **命令解析：**
   1. `uptime`：获取系统当前的负载信息
   2. `awk -F'[:,]'`：使用 `:` 和 `,` 作为输入分隔符进行解析
   3. `printf`：格式化输出三个负载值（$8, $9, $10），相对于 CPU 核心数（通过 `nproc` 获取），并以百分比形式显示
   4. `nproc=$(nproc)`：获取当前可用的 CPU 核心数

   </details>


3. 填写好 `名称` 和 `命令` 后，点击 `确定` 按钮，即可完成自定义内容的配置

4. 如果想展示的内容无法通过一条命令获取，也可以自行编辑一个脚本文件，比如 `.bat` 或者 `.sh`，并使用命令调用它

> [!NOTE]
> 此功能依赖于 `exec` 命令，几乎可以实现所有信息的展示，包括调用已安装的软件或请求网络 API 接口。不过，由于它直接执行终端命令，请务必避免使用高风险命令，例如 `rm -rf /` 等。
>
> 在调用命令之前，建议在 Shell 或 Cmd 环境中进行测试，以确保输出符合预期。许多命令的输出可能较为详细，因此请尽量对输出进行处理，以确保美观。例如，上述例子中使用了 `awk` 进行格式化。

## 常见问题

1. 显示`The Emperor's New XXX` 是什么意思？
   - 获取不到你的设备信息

## 支持与贡献 😽

如果你喜欢这个项目，请不妨点个 Star🌟，这是对开发者最大的动力， 当然，你可以对我 [爱发电](https://afdian.net/a/sumoqi) 赞助，呜咪~❤️

有意见或者建议也欢迎提交 [Issues](https://github.com/erzaozi/neko-status-plugin/issues) 和 [Pull requests](https://github.com/erzaozi/neko-status-plugin/pulls)。

## 相关项目 😻

- [Kabuda-czh/koishi-plugin-status-pro](https://github.com/Kabuda-czh/koishi-plugin-status-pro)
- [KomoriDev/nonebot-plugin-kawaii-status](https://github.com/KomoriDev/nonebot-plugin-kawaii-status)：NoneBot2 服务器状态查看插件 / View server status for NoneBot2

## 许可证

本项目使用 [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) 作为开源许可证。
