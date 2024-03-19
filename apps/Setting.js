import plugin from '../../../lib/plugins/plugin.js'
import Config from '../components/Config.js'
import Init from '../model/init.js'

export class neko_header extends plugin {
  constructor() {
    super({
      /** 功能名称 */
      name: 'neko头图',
      /** 功能描述 */
      dsc: '设置状态头图',
      event: 'message',
      /** 优先级，数字越小等级越高 */
      priority: 1009,
      rule: [
        {
          /** 命令正则匹配 */
          reg: '^[/#]?更换状态头图.*$',
          /** 执行方法 */
          fnc: 'header',
          /** 主人权限 */
          permission: 'master'
        },
        {
          /** 命令正则匹配 */
          reg: '^[/#]?更换状态模板.*$',
          /** 执行方法 */
          fnc: 'template',
          /** 主人权限 */
          permission: 'master'
        },
        {
          /** 命令正则匹配 */
          reg: '^[/#]?状态模板列表.*$',
          /** 执行方法 */
          fnc: 'templateList',
          /** 主人权限 */
          permission: 'master'
        }
      ]
    })
  }

  async header(e) {
    const config = await Config.getConfig();
    let url = e.msg.replace(/^[/#]?更换状态头图/, '').trim();
    let imageUrl;

    if (e.img) {
      imageUrl = e.img[0];
    }

    if (e.source) {
      const history = e.isGroup 
        ? await e.group.getChatHistory(e.source.seq, 1) 
        : await e.friend.getChatHistory(e.source.time, 1);
      const replyMessage = history.pop()?.message;

      if (replyMessage) {
        const imageVal = replyMessage.find(val => val.type === "image");
        if (imageVal) {
          imageUrl = imageVal.url;
        }
      }
    }

    if (url && !await isImageUrl(url)) {
      e.reply('无法获取到图片，请检查链接是否正确');
      return false;
    }

    url = url || imageUrl;

    if (url) {
      config.headimg_url = url;
      await Config.setConfig(config);
      e.reply('设置成功');
    } else {
      e.reply('无法获取到图片');
      return false;
    }
  }

  async template(e) {
    const config = await Config.getConfig();
    let template = e.msg.replace(/^[/#]?更换状态模板/, '').trim();

    let templateOptions = await Config.getTemplate();
    let templateList = templateOptions.map(val => val.value);

    if (templateList.indexOf(template) === -1) {
      e.reply('模板不存在，请发送“#状态模板列表”查看所有模板');
      return false;
    }

    config.use_template = template;
    await Config.setConfig(config);
    e.reply('设置成功，当前状态模板：' + template);
  }

  async templateList(e) {
    let templateOptions = await Config.getTemplate();
    let templateList = templateOptions.map(val => val.value);
    e.reply('状态模板列表：\n' + templateList.join('\n'));
    return true;
  }
}

async function isImageUrl(imageUrl) {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return contentType && contentType.startsWith('image/');
  } catch (error) {
    console.error('检查失败:', error);
    return false;
  }
}
