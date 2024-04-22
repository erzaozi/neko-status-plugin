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

- [x] CPU 占用
- [x] 内存占用
- [x] 网络上下行速率
- [x] 机器人磁盘占用
- [x] 系统信息
- [x] GPU 型号
- [x] 插件数量
- [x] 运行时间

## 效果图

<img src="https://github.com/erzaozi/neko-status-plugin/assets/61369914/6c99cbb7-16bf-4dcf-9f6b-9d99f5fac076" height="500" alt="renderings"/>
<img src="https://github.com/erzaozi/neko-status-plugin/assets/61369914/2b99c334-504c-4748-b079-21fd463eeb4c" height="500" alt="renderings"/>

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
