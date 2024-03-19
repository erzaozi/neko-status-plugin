import YAML from 'yaml'
import fs from 'fs'
import { pluginRoot, pluginResources } from '../model/path.js'
import Log from '../utils/logs.js'

class Config {
  getConfig () {
    try {
      const config_yaml = YAML.parse(
        fs.readFileSync(`${pluginRoot}/config/config/config.yaml`, 'utf-8')
      )
      return config_yaml
    } catch (err) {
      Log.e('读取config.yaml失败', err)
      return false
    }
  }

  getDefConfig () {
    try {
      const config_default_yaml = YAML.parse(
        fs.readFileSync(`${pluginRoot}/config/config_default.yaml`, 'utf-8')
      )
      return config_default_yaml
    } catch (err) {
      Log.e('读取config_default.yaml失败', err)
      return false
    }
  }

  setConfig (config_data) {
    try {
      fs.writeFileSync(
        `${pluginRoot}/config/config/config.yaml`,
        YAML.stringify(config_data)
      )
      return true
    } catch (err) {
      Log.e('写入config.yaml失败', err)
      return false
    }
  }

  getTemplate() {
    try {
      const template = fs.readdirSync(`${pluginResources}/template`)
      let templateOptions = []
      template.forEach((item) => {
        templateOptions.push({ label: item + '模板', value: item })
      })
      return templateOptions
    } catch (err) {
      Log.e('读取template失败', err)
      return [{ label: '读取失败', value: 'default' }]
    }
  }
}

export default new Config()
