<div align="center">
  
# Neko-Status-Plugin

</div>

![页面 1](https://github.com/erzaozi/neko-status-plugin/assets/61369914/14eca1b7-0a9b-47c1-8555-76479bf66b30)

## 😺 介绍

Yunzai-Bot 服务器状态查看插件，查看机器人服务器状态

如果您是 [Koishi](https://koishi.chat/) 或者是 [NoneBot](https://nonebot.dev/) 用户，对应平台也有开发者制作了类似的插件：[koishi-plugin-status-pro](https://github.com/Kabuda-czh/koishi-plugin-status-pro)、[nonebot-plugin-kawaii-status](https://github.com/KomoriDev/nonebot-plugin-kawaii-status)

## 😼 安装

- 克隆本仓库至 plugins 目录
```
git clone https://github.com/erzaozi/neko-status-plugin.git ./plugins/neko-status-plugin
```

- 安装依赖
```
pnpm install --filter=neko-status-plugin
```

## 🙀 配置

在项目的配置文件中添加下表中的可选配置

| 配置项 | 默认值 | 说明 |
| :---: | :---: | :---: |
| use_template | `default` | 使用的状态模板 |
| headimg_url | `https://api.miaomc.cn/image/get` | 使用的状态模板的图片，可以是静态图<br>也可以是图片API |

## 😸 使用

发送 `/status` 或 `#状态` 均可触发，发送 `#更换状态头图<url>` 即可更换状态模板内的图片

## 😻 效果图

**如果使用过程中出现错位问题可以加群 `551081559` 反馈问题**

<img src="https://github.com/erzaozi/neko-status-plugin/assets/61369914/6c99cbb7-16bf-4dcf-9f6b-9d99f5fac076" height="500" alt="renderings"/>
<img src="https://github.com/erzaozi/neko-status-plugin/assets/61369914/2b99c334-504c-4748-b079-21fd463eeb4c" height="500" alt="renderings"/>


## 😽 鸣谢

[Kabuda-czh/koishi-plugin-status-pro](https://github.com/Kabuda-czh/koishi-plugin-status-pro)：插件内置的default模板来源
