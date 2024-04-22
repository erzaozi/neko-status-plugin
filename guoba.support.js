import Config from "./components/Config.js";
import lodash from "lodash";
import path from "path";
import { pluginRoot } from "./model/path.js";

export function supportGuoba() {
  return {
    pluginInfo: {
      name: 'neko-status-plugin',
      title: 'neko-status-plugin',
      author: ['@erzaozi', '@CikeyQi'],
      authorLink: ['https://github.com/erzaozi', 'https://github.com/CikeyQi'],
      link: 'https://github.com/erzaozi/neko-status-plugin',
      isV3: true,
      isV2: false,
      description: '基于Yunzai-Bot的系统状态插件喵~',
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      icon: 'mdi:stove',
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
      iconColor: '#d19f56',
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
      iconPath: path.join(pluginRoot, 'resources/readme/girl.png'),
    },
    configInfo: {
      schemas: [
        {
          field: "use_template",
          label: "使用模板",
          bottomHelpMessage: "选择一个模板来展示系统状态",
          component: "Select",
          componentProps: {
            options: Config.getTemplate(),
          },
        },
        {
          field: "headimg_url",
          label: "头图地址",
          bottomHelpMessage: "输入一个图片地址来作为头图",
          component: "Input",
          componentProps: {
            placeholder: '图片地址，请自行测试是否有效',
          },
        },
      ],
      getConfigData() {
        let config = Config.getConfig()
        return config
      },

      setConfigData(data, { Result }) {
        let config = {}
        for (let [keyPath, value] of Object.entries(data)) {
          lodash.set(config, keyPath, value)
        }
        config = lodash.merge({}, Config.getConfig(), config)
        Config.setConfig(config)
        return Result.ok({}, '保存成功~')
      },
    },
  }
}