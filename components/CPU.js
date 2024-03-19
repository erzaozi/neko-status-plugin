import systemInformation from 'systeminformation';
import os from 'os';

/**
 * 获取CPU负载和频率
 * @return {Promise<Object>} 包含CPU负载和频率的对象
 */
export async function getCpuLoadAndSpeed() {
  try {
    const info = await systemInformation.get({
      currentLoad: 'currentLoad',
      cpu: 'speed'
    });

    return {
      text: `${info.currentLoad.currentLoad.toFixed(2)}% (${info.cpu.speed}GHz)`,
      progress: info.currentLoad.currentLoad / 100
    };
  } catch (error) {
    console.error('获取CPU信息时出错:', error);
    return {
      text: "0% (0GHz)",
      progress: 0
    };
  }
}

/**
 * 获取CPU型号
 * @return {Promise<Object>} 包含CPU型号的对象
 */
export async function getCpuModel() {
  try {
    const cpus = os.cpus();
    if (cpus.length === 0) {
      throw new Error('未找到CPU');
    }
    return {
      key: 'CPU',
      value: cpus[0].model.length > 36 ? cpus[0].model.slice(0, 36) + '...' : cpus[0].model
    };
  } catch (error) {
    console.error('获取CPU信息时出错:', error);
    return {
      key: 'CPU',
      value: "The Emperor's New CPU"
    };
  }
}