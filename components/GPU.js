import systemInformation from 'systeminformation';

/**
 * 获取GPU信息
 * @return {Promise<Object>} 包含GPU模型或错误提示的对象
 */
export async function getGpuInfo() {
  try {
    const gpuData = await systemInformation.get({
      graphics: 'controllers'
    });
    const gpu = gpuData.graphics.controllers.find(gpu => gpu.memoryTotal && gpu.memoryUsed && gpu.utilizationGpu);

    return {
      key: 'GPU',
      value: gpu.model.length > 36 ? gpu.model.slice(0, 36) + '...' : gpu.model
    };
  } catch (error) {
    console.error('获取GPU信息时出错:', error);
    return {
      key: 'GPU',
      value: "雜魚~不会连显卡都买不起吧~"
    };
  }
}