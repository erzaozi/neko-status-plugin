import fs from 'fs'
import { _path } from '../model/path.js'
import { formatNumber } from '../utils/formatTime.js'

export async function getAdapter(bot) {
    const { name: appName, version: appVersion } = bot.version || { name: 'ICQQ(QQ)', version: getIcqqVersion() }
    const sent = formatNumber(await redis.get(`Yz:count:send:msg:bot:${bot.uin}:total`)) || bot.stat?.sent_msg_cnt || 0
    const recv = formatNumber(await redis.get(`Yz:count:receive:msg:bot:${bot.uin}:total`)) || bot.stat?.recv_msg_cnt || 0
    return {
        key: 'Adapter',
        value: `${appName} ${appVersion} (↓${recv} ↑${sent})`
    }
}

function getIcqqVersion() {
    try {
        return JSON.parse(fs.readFileSync(`${_path}/node_modules/icqq/package.json`, "utf-8")).version
    } catch {
        return "unknown"
    }
}

