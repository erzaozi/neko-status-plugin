import systemInformation from 'systeminformation';

/**
 * 获取操作系统的分发版信息
 * @return {Promise<Object>} 包含分发版信息的对象
 */
export async function getSysInfo() {
  try {
    const info = await systemInformation.get({
      osInfo: 'distro'
    });

    return {
      key: 'System',
      value: info.osInfo.distro.length > 36 ? info.osInfo.distro.slice(0, 36) + '...' : info.osInfo.distro
    };
  } catch (error) {
    logger.error('获取系统信息时出错:', error);
    return {
      key: 'System',
      value: "The Emperor's New System"
    };
  }
}