import { getCpuLoadAndSpeed, getCpuModel } from "../components/CPU.js"
import { getMemoryUsageCircle } from "../components/Memory.js"
import { getNetworkSpeed } from "../components/Network.js"
import { getDiskUsageCircle } from "../components/Disk.js"
import { getSysInfo } from "../components/System.js"
import { getGpuInfo } from "../components/GPU.js"
import { getPluginNumInfo } from "../components/Plugin.js"
import Version from "../components/Version.js"
import formatTime from "../utils/formattime.js"
import Config from "../components/Config.js"

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

    async getInfoData() {
        const [cpu, system, gpu, plugin] = await Promise.all([
            getCpuModel(),
            getSysInfo(),
            getGpuInfo(),
            getPluginNumInfo()
        ]);
        return {
            cpu,
            system,
            gpu,
            plugin
        };
    }

    async getData(e) {
        const [dashboardData, infoData] = await Promise.all([
            this.getDashboardData(),
            this.getInfoData()
        ]);

        const data = {
            "BotVersion": Version.isMiao ? 'Miao-Yunzai' : Version.isTrss ? 'TRSS-Yunzai' : 'Yunzai',
            "BotName": Bot.nickname || e.bot.nickname || 'Shizuku',
            "HeadImage": await Config.getConfig().headimg_url,
            "Dashboard": dashboardData,
            "Info": infoData,
            "Runtime": formatTime(Date.now() / 1000 - Bot.stat?.start_time, 'Bot已运行dd天hh小时mm分钟', false)
        };

        return data;
    }
}