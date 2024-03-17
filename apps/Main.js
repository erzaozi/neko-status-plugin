import plugin from '../../../lib/plugins/plugin.js'
import { pluginResources } from '../model/path.js'
import getData from '../model/getData.js'
import puppeteer from '../../../lib/puppeteer/puppeteer.js'
import Config from '../components/Config.js'

export class neko_status extends plugin {
  constructor() {
    super({
      /** 功能名称 */
      name: 'neko状态',
      /** 功能描述 */
      dsc: '获取neko状态',
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 1009,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^[/#]?(状态|status)$',
          /** 执行方法 */
          fnc: 'status',
          permission: 'master'
        }
      ]
    })
  }

  async status(e) {
    const config = await Config.getConfig();

    const data = await getData.getData(e)

    const base64 = await puppeteer.screenshot('neko-status-plugin', {
      saveId: 'status',
      imgType: 'png',
      tplFile: `${pluginResources}/template/${config.use_template}/template.html`,
      pluginResources,
      data: data
    })
    await e.reply(base64)
    return true
  }
}