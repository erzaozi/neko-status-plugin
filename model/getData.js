import { getCpuLoadAndSpeed, getCpuModel } from "../components/CPU.js"
import { getMemoryUsageCircle } from "../components/Memory.js"
import { getNetworkSpeed } from "../components/Network.js"
import { getDiskUsageCircle } from "../components/Disk.js"
import { getSysInfo } from "../components/System.js"
import { getGpuInfo } from "../components/GPU.js"
import { getPluginNumInfo } from "../components/Plugin.js"
import { getAccountInfo } from "../components/Account.js"
import { getAdapter } from "../components/Adapter.js"
import Version from "../components/Version.js"
import formatTime from "../utils/formatTime.js"
import Config from "../components/Config.js"
import fetch from "node-fetch"

export default new class getData {
    async getDashboardData() {
        const [cpu, memory, network, disk] = await Promise.all([
            getCpuLoadAndSpeed(),
            getMemoryUsageCircle(),
            getNetworkSpeed(),
            getDiskUsageCircle()
        ]);
        return {
            cpu,
            memory,
            network,
            disk
        };
    }

    async getInfoData(bot) {
        const [cpu, system, gpu, plugin, adapter, account] = await Promise.all([
            getCpuModel(),
            getSysInfo(),
            getGpuInfo(),
            getPluginNumInfo(),
            getAdapter(bot),
            getAccountInfo(bot)
        ]);
        return {
            cpu,
            system,
            gpu,
            plugin,
            adapter,
            account
        };
    }

    async getHeadImage() {
        const url = Config.getConfig().headimg_url
        try {
            new URL(url);
            let response = await fetch(url)
            const arraybuffer = await response.arrayBuffer()
            let base64 = Buffer.from(arraybuffer).toString('base64')
            return 'data:image/png;base64,' + base64
        } catch (e) {
            return url
        }
    }

    async getData(e) {
        const [dashboardData, infoData] = await Promise.all([
            this.getDashboardData(),
            this.getInfoData(e.bot)
        ]);

        const bot = e.bot || Bot;

        const data = {
            "BotVersion": Version.isMiao ? 'Miao-Yunzai' : Version.isTrss ? 'TRSS-Yunzai' : 'Yunzai',
            "BotAvatar": bot.avatar || await bot.pickFriend(bot.uin).getAvatarUrl?.() || `https://q1.qlogo.cn/g?b=qq&s=0&nk=${bot.uin}`,
            "BotName": bot.nickname?.substring(0, 10) || 'Shizuku',
            "HeadImage": await this.getHeadImage(),
            "Dashboard": dashboardData,
            "Info": infoData,
            "Runtime": formatTime(Date.now() / 1000 - Bot.stat?.start_time, 'Bot已运行dd天hh小时mm分钟', false)
        };

        return data;
    }
}
